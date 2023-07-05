const route = require("express").Router();
const mealRoute = require("./meal.route");
const groupRoute = require("./group.route");
const userRoute = require("./user.route");

route.use("/meal", mealRoute);
route.use("/group", groupRoute);
route.use("/user", userRoute);
// app.use("/money", expenseRouter);
// app.use("/user", userRouter);
// app.use("/group", groupRouter);
// app.use("/group-expense", groupExpenseRouter);
// app.use("/meal", require("./api/meal/meal"));
module.exports = route;