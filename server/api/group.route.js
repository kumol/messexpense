const groupController = require("../controllers/group.controller");

const route = require("express").Router();

route.post("/", groupController.addGroup);
route.get("/", groupController.getGroup);
route.get("/full_details", groupController.getFullGroup);
route.get("/single/:id", groupController.getSingleGroup);
route.put("/:id", groupController.updateGroup);
route.delete("/:id", groupController.deleteGroup);

module.exports = route;