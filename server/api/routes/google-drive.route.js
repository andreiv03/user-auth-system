const { Router } = require("express");

const route = Router();
const { googleDriveController } = require("../controllers");
const { authorization, admin } = require("../middleware");

route.post("/upload", authorization, admin, googleDriveController.upload);
route.post("/delete", authorization, admin, googleDriveController.delete);

module.exports = route;