const mongoose = require("mongoose");
const db = require('../../models/db');

const Meal = require("../../models/Meal");

const User = require("../../models/user");
const { badRequest, created, success, notFound } = require("../shared/utls/httpResponseHandler");
const moment = require("moment");

module.exports = {
    addMeal: async (req, res, next) => {
        try {
            let { userId, groupId, userName, lunch, breakfast, dinner, date } = req.body;
            let user = await User.findOne({ id: req.user }).select("userId groupId roleId").lean()
            if (req.user != userId && (user.roleId > "2" && user.roleId < "1")) {
                return badRequest(res, "You have no access to add meal");
            }
            if (!user.groupId) {
                return badRequest(res, "User is not connected with any mess");
            }
            if (!userId || !groupId || !date || (!lunch && !dinner && !breakfast)) {
                return badRequest(res, "UserId groupId date and one of meal is required");
            }
            let month = moment(date).format("YYYY-MM");
            date = moment(date).format("YYYY-MM-DD");
            let meal = { date: date };
            lunch ? meal.lunch = lunch : meal.lunch = 0;
            dinner ? meal.dinner = dinner : meal.dinner = 0;
            breakfast ? meal.breakfast = breakfast : meal.breakfast = 0;
            let total = meal.lunch + meal.dinner + meal.breakfast;

            let thisMonth = await Meal.findOne({ userId: userId, groupId: groupId, month: month }).lean();
            if (thisMonth) {
                let meals = thisMonth.meals;

                let mealIndex = meals?.findIndex(m => m.date == date);
                mealIndex < 0 ? meals.push(meal) : meals.splice(mealIndex, 1, meal);
                let totalMeal = 0;
                meals?.map(m => {
                    totalMeal = totalMeal + ((m.breakfast || 0) + (m.lunch || 0) + (m.dinner || 0));
                });

                let updateMeal = await Meal.findOneAndUpdate({ userId: userId, groupId: groupId, month: month }, { $set: { total: totalMeal, meals: meals } }, { new: true });

                if (updateMeal) {
                    return success(res, "Successfully added", updateMeal);
                } else {
                    return notFound(res, "No content found", {});
                }
            } else {

                let newMeal = {
                    userId, groupId, userName, meals: [meal], month, total
                };

                newMeal = new Meal(newMeal);
                newMeal.id = newMeal._id;
                newMeal = await newMeal.save();
                return created(res, "", newMeal);
            }
        }
        catch (err) {
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
            return res.json({
                status: 200,
                success: true,
                body: meal
            })
        }
        catch (err) {
            return res.json({
                success: false,
                err: err.stack
            })
        }
    }
}