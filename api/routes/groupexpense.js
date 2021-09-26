const route = require("express").Router();
const GroupExpense = require("../../models/groupexpense");

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

});


module.exports = route;