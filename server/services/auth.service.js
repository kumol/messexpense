const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { throughError, forbidden } = require("../shared/utls/httpResponseHandler");
module.exports = {
    checkAuth: async (req, res, next) => {
        try {
            let bearer = req.headers.authorization;
            let token = bearer?.split(" ")[1];
            if (!token) {
                return forbidden(res, "Please login again", {});
            }
            var decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded.data.id
            next();
        } catch (err) {
            if (err.message == "jwt expired") {
                return forbidden(res, "Your jwt is expired", err.stack);
            }
            return throughError(res, err);
        }
    },
    isAdmin: async () => {
        return true;
    },
    isManager: async () => {
        return true;
    },
    isCreator: async () => {
        return true;
    },
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    passwordCompare: (password, hash) => {
        return bcrypt.compareSync(password, hash);;
    },

    setToken: (data) => {
        return jwt.sign({
            data: data
        }, process.env.SECRET, { expiresIn: '1h' });
    }
}