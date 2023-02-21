require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const EmployeeModel = require("./db/employee.model");
const robertRoutes = require("./routes/robertRoute");
const filterRoutes = require("./routes/filterRoutes");
const sortRoutes = require("./routes/sortRoutes");
const colorsRoutes = require("./routes/colorsRoutes");
const missingEmployeesRoutes = require("./routes/missingEmployeesRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express()
    .use(express.json())
    .use(cors())
    .use("/api/employees/robert", robertRoutes)
    .use("/api/employees/filter", filterRoutes)
    .use("/api/employees/sort", sortRoutes)
    .use("/api/employees/missing", missingEmployeesRoutes)
    .use("/api/colors", colorsRoutes)
    .use("/api", equipmentRoutes)
    .use("/api/employees/:id", async (req, res, next) => {
        let employee = null;

        try {
            employee = await EmployeeModel.findById(req.params.id);
        } catch (err) {
            return next(err);
        }

        if (!employee) {
            return res.status(404).end("Employee not found");
        }

        req.employee = employee;
        next();
    })
    .get("/api/employees/", async (req, res) => {
        const employees = await EmployeeModel.find()
            .sort({ created: "desc" })
            .lean();
        return res.json(employees);
    })
    .get("/api/employees/:id", (req, res) => {
        return res.json(req.employee);
    })
    .post("/api/employees/", async (req, res, next) => {
        const employee = req.body;

        try {
            const saved = await EmployeeModel.create(employee);
            return res.json(saved);
        } catch (err) {
            return next(err);
        }
    })
    .patch("/api/employees/:id", async (req, res, next) => {
        const employee = req.body;

        try {
            const updated = await req.employee.set(employee).save();
            return res.json(updated);
        } catch (err) {
            return next(err);
        }
    })
    .delete("/api/employees/:id", async (req, res, next) => {
        try {
            const deleted = await req.employee.delete({ '_id': req.params.id});
            return res.json(deleted);
        } catch (err) {
            return next(err);
        }
    });

const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log(`App is listening on ${PORT}`);
        console.log("Try /api/employees route right now");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
