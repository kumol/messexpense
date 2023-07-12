const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    "name": String,
    "password": String,
    "creator": {
        type: String,
        required: true
    },
    "id": String,
    manager: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Group", groupSchema, "groups");