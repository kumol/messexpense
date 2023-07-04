const route = require("express").Router();
const mealController = require("../controllers/meal.controller");

route.get("/meal", mealController.getMeal);

route.post("/meal", mealController.addMeal);

module.exports = route;