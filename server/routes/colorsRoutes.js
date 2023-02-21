const { Router } = require("express");
const ColorsModel = require("../db/colors.model");

module.exports = Router()
        .get(
            "/",
            async (req, res) => {
                try {
                    const colors = await ColorsModel.find({});
                    res.send(colors);
                } catch (error) {
                    console.log(error);
                }
            }
        )
