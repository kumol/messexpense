const groupController = require("../controllers/group.controller");
const groupexpenseController = require("../controllers/groupexpense.controller");

const route = require("express").Router();

route.post("/", groupController.addGroup);
route.get("/", groupController.getGroup);
route.get("/details", groupController.getFullGroup);
route.get("/details/:id", groupController.getSingleGroup);
route.put("/details/:id", groupController.updateGroup);
route.delete("/details/:id", groupController.deleteGroup);

route.get('/expense/details', groupexpenseController.getExpense);
route.get('/expense/details/single/:id', groupexpenseController.getSingleExpense);
route.post('/expense/details', groupexpenseController.createExpense);
route.patch('/expense/details/:id', groupexpenseController.updateExpense);
route.get('/expense/details/bygroup/:id', groupexpenseController.getExpenseByGroup);


module.exports = route;