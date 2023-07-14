const { uploadFile } = require("../controllers/global.controller");
const globalService = require("../shared/middleware/global");
const route = require("express").Router();

route.post("/file/upload", globalService.fileUploader().array("file"), uploadFile);

module.exports = route;
// upload.array("file")