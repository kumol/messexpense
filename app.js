const express = require("express");
const app = express();
require("./models/db");
ExpenseMoney = require("./models/expense");
const router = require("./api/routes/expense");
app.listen(4000, (err) => {
    console.log("connected port 4000");
});

app.use("/", router);