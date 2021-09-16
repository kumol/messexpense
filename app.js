const express = require("express");
const app = express();
require("./models/db");
ExpenseMoney = require("./models/expense");
const expenseRouter = require("./api/routes/expense");
const userRouter = require("./api/routes/user");

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(4000, (err) => {
    console.log("connected port 4000");
});

app.use("/money", expenseRouter);
app.use("/user", userRouter);