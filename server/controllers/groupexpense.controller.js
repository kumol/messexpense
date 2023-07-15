const route = require("express").Router();
const GroupExpense = require("../../models/groupexpense");
const moment = require("moment");
const { badRequest, created, throughError } = require("../shared/utls/httpResponseHandler");
module.exports = {
    getExpense : async(req,res,next)=>{
    try{
        let expense = await GroupExpense.find({});
        let total = 0;
        expense.map(o=>{
            total += o.spentMoney;
        });
        return res.status(200).json({
            body: expense,
            total: total,
            success: true,
            statusCode: 200,
            message: "content found"
        });
    }catch(error){
        res.status(500).json({
            "body": error.stack
        });
    }
},

getSingleExpense: async(req,res,next)=>{
    try{
        let expense = await GroupExpense.findOne({id: req.params.id});
        return res.status(200).json({
            "body": expense
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
},

getExpenseByGroup: async(req,res)=>{
    try{
        let expense = await GroupExpense.find({group: req.params.id});
        return res.status(200).json({
            "expenses": expense
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
},

createExpense : async(req,res,next)=>{
    try{
        let {group, spentMoney, date, details, type} = req.body;
        let body = {};
        if(!group || !spentMoney || !details){
            return badRequest(res, "Group Id spent amount and it's details are required");
        }
        body.grouId = group;
        body.spentMoney = spentMoney;
        body.details = details;
        body.date = date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        body.type = type ? type : "meal";
        body.createdAt = moment().format("YYYY-MM-DD h:mm:ss a"),
        createdBy = req.user.id;
        let newExpense = new GroupExpense(body);
        newExpense.id = newExpense._id;
        let expense = await newExpense.save();
        return created(res, "Expense creation successful", expense);
    }catch(error){
        return throughError(res, error);
    }
},

updateExpense: async(req,res)=>{
    try{
        let updateObj = {...req.body};
        updateObj["createdAt"] = new Date();
        let expense = GroupExpense.findOneAndUpdate({id:req.params.id},{$set:updateObj},{new:true});
        res.status(200).json({
            "body":{
                "expense": expense
            }
        })
    }catch(err){
        res.status(500).json({"error": error});
    }

}}