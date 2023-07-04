const userController = require("../controllers/user.controller");

const route = require("express").Router();

route.get("/", userController.getUser);

route.post("/", userController.addUser);

route.get("/group", userController.getGroupUser);
route.put("/:id", userController.updateUser);
route.delete("/:id", userController.deleteUser);


module.exports = route;