const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

module.exports = Router()
        .get(
            "/position-level",
            async (req, res) => {
                try {
                    const { position, level } = req.query;
                    let query = {};
                    if(position) {
                    query.position = position;
                    }
                    if(level) {
                    query.level = level;
                    }
                    const filteredByLevelPosition = await EmployeeModel.find(query);
                    res.send(filteredByLevelPosition);
                } catch (error) {
                    console.log(error);
                }
            }
        )
