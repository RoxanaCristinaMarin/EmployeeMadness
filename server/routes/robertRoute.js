const { Router } = require('express')
const EmployeeModel = require("../db/employee.model");

module.exports = Router()
            .get('/robert', async (req, res) => {
               

                try {
                    await EmployeeModel.find(
                        { "name": /Robert/i }, 
                            function(err,name) { 
                                res.send(name);
                            }
                    );
                    
                } catch (error) {
                    console.log(error);
                }
            })