const route = require("express").Router();
const GroupExpense = require("../../models/groupexpense");
const moment = require("moment");
route.get("/", async(req,res,next)=>{
    try{
        let group = await GroupExpense.find({});
        return res.status(200).json({
            "body": {"group": group}
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
});

route.get("/:id", async(req,res,next)=>{
    try{
        let group = await GroupExpense.findOne({id: req.params.id});
        return res.status(200).json({
            "body": {"group": group}
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
});

route.get("/group/:id",async(req,res)=>{
    try{
        let group = await GroupExpense.find({group: req.params.id});
        return res.status(200).json({
            "body": {"group": group}
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
})

route.post('/', async(req,res,next)=>{
    try{
        let newExpense = new GroupExpense({
            "createdAt": new Date(),
            "spentMoney": req.body.spentMoney,
            "user": req.body.user,
            "date": moment().format("YYYY-MM-DD"),
            "time": moment().format('LT'),
            "day": moment().day("D"),
            "year": moment().year(),
            "month": moment().format("M"),
            "details": req.body.details
        }),
        expense = await newExpense.save();
        res.status(200).json({
            "body":{
                "expense": expense
            }
        })
    }catch(error){
        res.status(500).json({"error": error});
    }
});
module.exports = route;