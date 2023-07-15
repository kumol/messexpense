const { throughError, success } = require("../shared/utls/httpResponseHandler");

module.exports = {
    uploadFile: async (req, res) => {
        try {
            let uploadedFile = [];
            req.files.map(f => {
                uploadedFile.push("uploads/" + f.filename)
            })
            return success(res, "file uploaded", uploadedFile);
        } catch (err) {
            return throughError(res, err);
        }
    }
}