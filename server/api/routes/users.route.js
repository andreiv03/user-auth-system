const { Router } = require("express");

const route = Router();
const { usersController } = require("../controllers");
const { authorization } = require("../middleware");

route.get("/account", authorization, usersController.getUser);
route.patch("/:id", authorization, usersController.updateUser);
route.patch("/change-password/:id", authorization, usersController.changePassword);

module.exports = route;