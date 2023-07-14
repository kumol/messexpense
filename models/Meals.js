const mongoose = require("mongoose");

const mealsSchema = new mongoose.Schema({
    "userId": String,
    "breakfast": {
        type: Number,
        default: 0.5
    },
    "lunch": {
        type: Number,
        default: 0.5
    },
    "dinner": {
        type: Number,
        default: 0.5
    },
    "groupId": String,
    "userName": String,
    "date": String,
    "id": String,
    "total": Number
});

module.exports = mongoose.model("Meals", mealsSchema, "meals");