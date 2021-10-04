const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors());
require("./models/db");
const expenseRouter = require("./api/routes/expense");
const userRouter = require("./api/routes/user");
const groupRouter = require("./api/routes/group");
const groupExpenseRouter = require("./api/routes/groupexpense");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(5000, (err) => {
    console.log("connected port 5000");
});

app.get("/",(req,res)=>{
    res.json({"isContentBlocked": true});
});
app.post("/",cors(),(req,res)=>{
    console.log(req.body);
    res.status(200).json({"body": req.body});
})
app.use("/money", expenseRouter);
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/group-expense", groupExpenseRouter);