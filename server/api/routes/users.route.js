const { Router } = require("express");

const route = Router();
const { usersController } = require("../controllers");
const { authorization } = require("../middleware");

route.get("/account", authorization, usersController.getUser);
route.patch("/account/:id", authorization, usersController.updateUser);
route.patch("/account/change-password/:id", authorization, usersController.changePassword);

module.exports = route;