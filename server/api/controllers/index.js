const authController = require("./auth.controller.js");
const usersController = require("./users.controller.js");
const productsController = require("./products.controller.js");
const categoriesController = require("./categories.controller.js");
const googleDriveController = require("./google-drive.controller.js");

module.exports = { authController, usersController, productsController, categoriesController, googleDriveController };