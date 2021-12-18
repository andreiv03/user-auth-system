const { Router } = require("express");
const { googleDriveController } = require("../controllers");
const { authorization, admin } = require("../middleware");

const route = Router();
route.post("/upload", authorization, admin, googleDriveController.upload);
route.post("/delete", authorization, admin, googleDriveController.delete);

module.exports = route;