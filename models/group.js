const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    "name": String,
    "password": String,
    "creator": {
        type: String,
        required: true
    },
    "id": String,
    mannager: String
});

module.exports = mongoose.model("Group", groupSchema, "groups");