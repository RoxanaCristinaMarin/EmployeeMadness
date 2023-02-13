const { Router } = require('express');
const EmployeeModel = require("../db/employee.model");

module.exports = Router()
            .get('/filter-position/:position', async (req, res) => {
               

                try {
                    const filteredByPosition = await EmployeeModel.find(
                        { "position": req.params.position }
                    );
                    res.send(filteredByPosition)
                    
                } catch (error) {
                    console.log(error);
                }
            })