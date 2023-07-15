const moment = require("moment");
const mongoose = require("mongoose");
module.exports = mongoose.model("GroupExpense", mongoose.Schema({
    id: String,
    createdAt: {
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    spentMoney: { type: Number, default: 0 },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD")
    },
    groupId: {
        type: String,
        default: ""
    },
    details: {
        type: String,
        default: ""
    },
    createdBy: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ["utility", "meal"],
        default: "meal"
    }
}));