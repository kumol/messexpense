const { throughError, created, badRequest, success, notFound, notModified } = require("../shared/utls/httpResponseHandler");
const Group = require("../../models/Group");

module.exports = {
    addGroup: async (req, res) => {
        try {
            let { name, password, manager } = req.body;

            if (!name && !password) {
                return badRequest(res, "Name and password are required");
            }
            let newGroup = { name, password, creator: req.user.id };
            newGroup.manager = manager ? manager : req.user.id;

            let group = new Group(newGroup);
            group.id = group._id;
            group = await group.save();
            return created(res, "successfully created", group);
        } catch (err) {
            return throughError(res, err);
        }
    },
    getGroup: async (req, res) => {
        try {
            let page = +req.query.page || 1,
                limit = +req.query.limit || 10,
                total = await Group.countDocuments({});
            let group = await Group.find({}).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit).lean();
            return success(res, "", group, { total: total, limit, page });
        } catch (err) {
            return throughError(res, err);
        }
    },

    getFullGroup: async (req, res) => {
        try {
            let page = +req.query.page || 1,
                limit = +req.query.limit || 10,
                total = await Group.countDocuments({});
            let group = await Group.find({}).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit).lean();
            return success(res, "", group, { total: total, limit, page });
        } catch (err) {
            return throughError(res, err);
        }
    },

    getSingleGroup: async (req, res) => {
        try {
            let { id } = req.params;
            let group = await Group.findOne({ id: id }).lean();
            return success(res, "", group);
        } catch (err) {
            return throughError(res, err);
        }
    },

    deleteGroup: async (req, res) => {
        try {
            let { id } = req.params;
            let deletedGroup = await Group.deleteOne({ id: id }).lean();
            return deletedGroup ? success(res, "Successfully deleted", {}) : notFound(res, "No user found", {});
        } catch (err) {
            return throughError(res, err);
        }
    },

    updateGroup: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, password, manager } = req.body;
            let updateObj = {};
            name ? updateObj.name = name : null;
            password ? updateObj.password = password : null;
            manager ? updateObj.manager = manager : null;
            let updated = await Group.updateOne({ id: id }, { $set: updateObj });
            let group = await Group.findOne({ id }).lean();
            return updated.modifiedCount ? success(res, "", group) : notModified(res, "Unable to modify", group);
        } catch (err) {
            return throughError(res, err);
        }
    }
}