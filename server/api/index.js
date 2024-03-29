const route = require("express").Router();
const groupRoute = require("./group.route");
const userRoute = require("./user/user.route");
const globalRoute = require("./global.route");

route.use("/group", groupRoute);
route.use("/user", userRoute);
route.use("/global", globalRoute);
// app.use("/money", expenseRouter);
// app.use("/user", userRouter);
// app.use("/group", groupRouter);
// app.use("/group-expense", groupExpenseRouter);
// app.use("/meal", require("./api/meal/meal"));
module.exports = route;