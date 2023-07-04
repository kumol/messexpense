const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    "userId": String,
    "groupId": String,
    "userName": String,
    "month": String,
    "id": String,
    "total": Number,
    "meals": [
        {
            "breakfast": Number,
            "lunch": Number,
            "dinner": Number,
            "date": String
        }
    ]
    // "groupId": String,
    // "id": String,
    // "date": String,
    // "meals": [
    //     {
    //         "breakfast": Number,
    //         "lunch": Number,
    //         "dinner": Number,
    //         "userName": String,
    //         "userId": String
    //     }
    // ]
});

module.exports = mongoose.model("Meal", mealSchema, "meal");