const mongoose = require("mongoose");
const db = require('../../models/db');

const Meal = require("../../models/Meal");

const User = require("../../models/user");
module.exports = {
    addMeal: async (req, res, next) => {
        try {

            let body = req.body
            return res.json({
                "status": "Success",
                bolb: "uploadedFile"
            })
        }
        catch (err) {
            console.log(err);
            return res.json({
                success: false,
                err: err.stack
            })
        }
    },
    getMeal: async (req, res, next) => {
        try {
            let meal = await Meal.aggregate([{ $match: { "groupId": "62965524d6a881a4909ec7f8" } }, { $unwind: "$meals" }, {
                "$group": {
                    _id: "$meals.date",
                    meals: {
                        $push: {
                            userName: "$userName",
                            userId: "$userId",
                            groupId: "$groupId",
                            breakfast: "$meals.breakfast",
                            lunch: "$meals.lunch",
                            dinner: "$meals.dinner",
                            total: "$total"
                        }
                    }
                }
            }])


            let userList = await User.find({ groupId: "62965524d6a881a4909ec7f8" });
            console.log(userList);
            return res.json({
                status: 200,
                success: true,
                body: meal
            })
        }
        catch (err) {
            console.log(err);
            return res.json({
                success: false,
                err: err.stack
            })
        }
    }
}