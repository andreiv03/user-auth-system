const { Router } = require("express");

const route = Router();
const { usersController } = require("../controllers");
const { authorization } = require("../middleware");

route.get("/user", authorization, usersController.getUser);
route.patch("/account/:id", authorization, usersController.updateUser);
route.patch("/password/:id", authorization, usersController.changePassword);

module.exports = route;