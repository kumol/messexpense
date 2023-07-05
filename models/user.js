const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        default: ""
    },
    lName: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    password: String,
    group: {
        deposit: Number,
        mealCount: Number,
        expense: Number,
        dueAmount: Number
    },
    id: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        default: "3"
    },
    email: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema, "users");