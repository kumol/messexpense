const User = require("../../models/user");
const { throughError, created, badRequest, success, notFound, notModified } = require("../shared/utls/httpResponseHandler");
module.exports = {
    addUser: async (req, res) => {
        try {
            let { name, password, groupId, deposit, mealCount, expense, dueAmount } = req.body;
            if (!name || !password) {
                return badRequest(res, "Name and password are required");
            }
            let user = new User({ name, password, groupId, group: { deposit: deposit || 0, mealCount: mealCount || 0, expense: expense || 0, dueAmount: dueAmount || 0 } });
            user.id = user._id;
            user.userId = Math.random().toString(36).substring(2, 9).slice(-11).toUpperCase() + Math.random(9).toString(30).substring(2, 3).toUpperCase();
            user = await user.save();
            return created(res, "successfully created", user);
        } catch (err) {
            return throughError(res, err);
        }
    },
    getUser: async (req, res) => {
        try {
            let page = +req.query.page || 1,
                limit = +req.query.limit || 10,
                total = await User.countDocuments({});
            let user = await User.find({}).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit).lean();
            return success(res, "", user, { total: total, limit, page });
        } catch (err) {
            return throughError(res, err);
        }
    },
    getGroupUser: async (req, res) => {
        try {
            let groupId = req.query.groupId;
            if (!groupId) {
                return badRequest(res, "groupId is required");
            }
            let user = await User.find({ groupId: groupId }).sort({ _id: -1 }).lean();
            return success(res, "", user);
        } catch (err) {
            return throughError(res, err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            let { id } = req.params;
            let deletedUser = await User.deleteOne({ userId: id }).lean();
            return deletedUser ? success(res, "successfully deleted", {}) : notFound(res, "no user found", {});
        } catch (err) {
            return throughError(res, err);
        }
    },

    updateUser: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, password, groupId, deposit, mealCount, expense, dueAmount } = req.body;
            let updateObj = {};
            if (groupId) {
                updateObj.groupId = groupId;
                updateObj.group.deposit = 0;
                updateObj.group.mealCount = 0;
                updateObj.group.expense = 0;
                updateObj.group.dueAmount = 0;
            }
            name ? updateObj.name = name : null;
            password ? updateObj.password = password : null;
            deposit ? updateObj.groupId.deposit = deposit : null;
            mealCount ? updateObj.groupId.mealCount = mealCount : null;
            expense ? updateObj.groupId.expense = expense : null;
            dueAmount ? updateObj.groupId.dueAmount = dueAmount : null;

            let updated = await User.updateOne({ userId: id }, { $set: updateObj });
            let user = await User.findOne({ userId }).lean();
            return updated.modifiedCount ? success(res, "", user) : notModified(res, "Unable to modify", user);
        } catch (err) {
            return throughError(res, err);
        }
    }
}