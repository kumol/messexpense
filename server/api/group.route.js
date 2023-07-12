const groupController = require("../controllers/group.controller");
const groupexpenseController = require("../controllers/groupexpense.controller");
const authService = require("../services/auth.service");

const route = require("express").Router();

route.post("/details", authService.checkAuth, groupController.addGroup);
route.get("/details", groupController.getGroup);
route.get("/details/data/", groupController.getFullGroup);
route.get("/details/:id", groupController.getSingleGroup);
route.put("/details/:id", groupController.updateGroup);
route.delete("/details/:id", groupController.deleteGroup);

route.get('/expense/details', groupexpenseController.getExpense);
route.get('/expense/details/single/:id', groupexpenseController.getSingleExpense);
route.post('/expense/details', groupexpenseController.createExpense);
route.patch('/expense/details/:id', groupexpenseController.updateExpense);
route.get('/expense/details/bygroup/:id', groupexpenseController.getExpenseByGroup);


module.exports = route;