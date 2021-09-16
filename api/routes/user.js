const User = require("../../models/user");
const route = require("express").Router();

route.get("/", async (req, res) => {
    try {
        let counter = await User.find({}).count(),
            newUser = new User({
                name: req.body.name,
                password: req.body.password,
                id: counter ? counter : 1
            })
        user = await newUser.save();
        res.status(200).json({ "user": user });
    } catch (err) {
        res.status(500).json({ "error": err })
    }
});

route.post("/", async (req, res) => {
    try {
        let user = await User.find({});
        res.status(200).json({ "user": user });
    } catch (err) {
        res.status(500).json({ "error": err })
    }
})

module.exports = route;