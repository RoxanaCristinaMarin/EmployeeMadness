const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

module.exports = Router()
        .get(
            "/",
            async (req, res) => {
                try {
                    const { firstName, position, level } = req.query

                    if(firstName) {
                        const sortByFirstName = await EmployeeModel.find({}).sort({ 'name': 1 }).exec();
                        res.send(sortByFirstName);
                    }
                    if(position) {
                        const sortByPos = await EmployeeModel.find({}).sort({ 'position': 1 }).exec();
                        res.send(sortByPos);
                    }
                    if(level) {
                        const sortByLev = await EmployeeModel.find({}).sort({ 'level': -1 }).exec();
                        res.send(sortByLev);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
