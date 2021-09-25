const mongoose = require("mongoose");
module.exports = mongoose.model("Group", mongoose.Schema({
    name: String,
    password: String,
    id: Number,
    user:[Number],
    creator: Number,
}));
