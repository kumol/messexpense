const route = require("express").Router();
const mealController = require("../../controllers/meal.controller");
const authService = require("../../services/auth.service");

route.get("/meal", mealController.getMeal);

route.post("/meal", authService.checkAuth, mealController.addMeal);

module.exports = route;