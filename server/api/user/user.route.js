const userController = require("../../controllers/user.controller");
const authService = require("../../services/auth.service");
const route = require("express").Router();
const mealRoute = require("./meal.route");
route.use(mealRoute);
route.get("/details/", authService.checkAuth, userController.getUser);

route.post("/details", userController.addUser);

route.get("/group", userController.getGroupUser);
route.put("/details/:id", userController.updateUser);
route.delete("/details/:id", userController.deleteUser);

route.post("/login", userController.login);

module.exports = route;