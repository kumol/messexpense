const userController = require("../../controllers/user.controller");
const route = require("express").Router();

route.get("/details/", userController.getUser);

route.post("/details", userController.addUser);

route.get("/group", userController.getGroupUser);
route.put("/details/:id", userController.updateUser);
route.delete("/details/:id", userController.deleteUser);

route.post("/login", userController.login);

module.exports = route;