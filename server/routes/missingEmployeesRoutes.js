const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

module.exports = Router()
        .get("/", async (req, res) => {
                let { id } = req.query

                try {
                    const result = await EmployeeModel.find({ _id:  { $ne : id}})
                    res.send(result)
                } catch (error) {
                    console.log(error);
                }
                        
        });
