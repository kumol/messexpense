const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "name": String,
    "password": String,
    "group": {
        "deposit": Number,
        "mealCount": Number,
        "expense": Number,
        "dueAmount": Number
    },
    "id": {
        type: String,
        required: true
    },
    "groupId": {
        type: String,
        default: ""
    },
    "userId": {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("User", userSchema, "users");