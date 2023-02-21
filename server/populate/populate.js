/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const colors = require("./colors.json");
const EmployeeModel = require("../db/employee.model");
const ColorsModel = require("../db/colors.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const allColors = await ColorsModel.find({}).distinct('_id')

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favColor: pick(allColors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateColors = async () => {
  await ColorsModel.deleteMany({});

  const addColors = colors.map((color) => ({
    name: color,
  }));

  await ColorsModel.create(addColors);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateColors();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
