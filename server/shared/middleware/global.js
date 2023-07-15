module.exports = {
    fileUploader: () => {
        const fs = require("fs");
        const multer = require("multer");
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/')
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
                let extention = file.originalname.split(".")[1];
                if (extention != "png" && extention != "PNG" && extention != "jpg" && extention != "JPEG" && extention != "JPG" && extention != "jpeg") {

                }
                cb(null, file.fieldname + '-' + uniqueSuffix + "." + extention)
            }
        })

        const upload = multer({ storage: storage, limits: { fileSize: 1000 * 1000 * 1000 } });
        return upload;
    }
}