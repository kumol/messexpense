const mongoose = require("mongoose");
module.exports = mongoose.model("GroupExpense", mongoose.Schema({
    createdAt: Date,
    spentMoney: Number,
    date: String,
    time: String,
    group: Number,
    day: String,
    month: String,
    year: String,
    details: String
}));