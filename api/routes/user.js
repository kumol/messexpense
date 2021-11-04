const { Router } = require("express");
const User = require("../../models/user");
const route = require("express").Router();

route.post("/", async (req, res) => {
    try {
        let counter = await User.find({}).count(),
            newUser = new User({
                name: req.body.name,
                password: req.body.password,
                id: counter+1,
                group:{
                    id: req.body.group ? req.body.group : user.group.id,
                    deposite: req.params.deposite ? req.params.deposite : 0,
                    mealCount: req.params.mealCount ? req.params.mealCount : 0,
                    expense: req.params.expense ? req.params.expense : 0,
                    dueAmount: req.params.dueAmount ? req.params.dueAmount : 0,
                }
            })
        let user = await newUser.save();
        res.status(200).json({ "user": user });
    } catch (err) {
        res.status(500).json({ "error": err })
    }
});

route.post("/", async (req, res) => {
    try {
        let user = await User.find({});
        res.status(200).json({ "user": user });
    } catch (err) {
        res.status(500).json({ "error": err })
    }
})

route.get("/group/:id", async(req,res)=>{
    try{
        let id = Number(req.params.id),
         user = await User.aggregate([{
            $match:{"group.id": id}
        },{
            $project:{
                "name": "$name",
                "id": "$id",
                "groupId": "$group.id",
                "deposite": "$group.deposite",
                "mealCount": "$group.mealCount",
                "expense": "$group.expense",
                "dueAmount": "$group.dueAmount"
            }
        }]);
        console.log("responsing");
        res.status(200).json({ "members": user });
    }catch(error){
        res.status(500).json({ "error": err });
    }
})

module.exports = route;