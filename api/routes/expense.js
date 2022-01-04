const route = require("express").Router();
const SpentMoney = require("../../models/expense");
const moment = require('moment');

route.post("/", async (req, res) => {
    try {
        let spentMoney = new SpentMoney({
            createdAt: moment(),
            spentMoney: req.body.spentMoney ? req.body.spentMoney : 0,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format('LT'),
            day: moment().day("D"),
            year: moment().year(),
            month: moment().format("M"),
            details: req.body.details,
            user: 1
        });
        spentMoney.id = spentMoney._id;
        spentMoney = await spentMoney.save();
        res.status(200).json({
            "spentMoney": spentMoney
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": err })
    }
})
route.get("/", async (req, res) => {
    try {
        let spentMoney = await SpentMoney.find();
        res.status(200).json({
            "spentMoney": spentMoney
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": err })
    }
});

route.get("/spent-money", async(req,res)=>{
    try{
        let spent = await SpentMoney.aggregate([{$match:{user:1}},{$group:{_id:"$date",cost:{$sum:"$spentMoney"}}},{$limit:1}]);
        res.status(200).json({"body": spent})
    }catch(err){
        res.status(500).json({ "error": err })
    }
})

module.exports = route;