const { Router } = require("express");
const EquipmentModel = require("../db/equipment.model");

module.exports = Router()
        .get("/equipment", async (req, res, next) => {

            try {
                const equipment = await EquipmentModel.find({});
                return res.json(equipment);
            } catch (err) {
                return next(err);
            }
        })
        .get("/equipment/:id", async (req, res) => {
            const findById = await EquipmentModel.findById(req.params.id)
            return res.json(findById);
        })
        .post("/equipment", async (req, res, next) => {
            const equipment = req.body;

            try {
                const saved = await EquipmentModel.create(equipment);
                return res.json(saved);
            } catch (err) {
                return next(err);
            }
        })
        .patch("/equipment/:id", async (req, res, next) => {
            const equipment = req.body;
    
            try {
                const updated = await EquipmentModel.findOneAndUpdate({ '_id': req.params.id }, equipment);
                return res.json(updated);
            } catch (err) {
                return next(err);
            }
        })
        .delete("/equipment/:id", async (req, res, next) => {
    
            try {
                const deleted = await EquipmentModel.deleteOne({ '_id': req.params.id });
                return res.json(deleted);
            } catch (err) {
                return next(err);
            }
        })