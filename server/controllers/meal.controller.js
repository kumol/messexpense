const mongoose = require("mongoose");
const db = require('../../models/db');

const Meal = require("../../models/Meal");
const Meals = require("../../models/Meals");
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
            let month = req.query.month;
            let meals = await Meal.aggregate([{ $match: { groupId: "64ae666bb1b1e05a2886244a" } }, { $unwind: "$meals" },
            { $group: { _id: "$meals.date", user: { $push: { userId: "$userId", userName: "$userName", breakfast: "$meals.breakfast", dinner: "$meals.dinner", lunch: "$meals.lunch", total: "$total" } } } }, { $sort: { _id: 1 } }])

            let totalMeal = 0;
            // let userList = await User.find({ groupId: "64ae666bb1b1e05a2886244a" }).select("id name");
            let userObject = {},
                userTotal = {};
            let dayCount = moment(month).daysInMonth();
            let date = moment(month).startOf("M").format("YYYY-MM-DD");
            let days = [];
            for (i = 0; i < dayCount; i++) {
                days.push(date);
                date = moment(date).add(1, "day").format("YYYY-MM-DD");
            }

            // userList = userList.map(u => {
            //     userObject[u.id] = {
            //         breakfast: 0,
            //         lunch: 0,
            //         dinner: 0,
            //         total: 0
            //     }
            //     userTotal[u.id] = 0;
            //     return {
            //         id: u.id, name: u.name
            //     }
            // })

            let meal = {}
            meals.map(m => {
                m.user?.map(u => {
                    userObject[u.userId] = {
                        breakfast: u.breakfast || 0,
                        lunch: u.lunch || 0,
                        dinner: u.dinner || 0
                    };
                    totalMeal += ((u.breakfast || 0) + (u.lunch || 0) + (u.dinner || 0));
                    if (!userTotal[u.userId]) {
                        userTotal[u.userId] = {
                            id: u.userId,
                            name: u.userName,
                            total: u.total
                        }
                    };
                });
                meal[m._id] = userObject;
            })

            let userList = [];
            for (keys in userTotal) {
                userList.push(userTotal[keys])
            }
            return res.json({
                status: 200,
                success: true,
                body: { total: totalMeal, userList, days: days, meal }
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