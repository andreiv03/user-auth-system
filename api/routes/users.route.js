const { Router } = require("express");
const { usersController } = require("../controllers");
const { authorization } = require("../middleware");

const route = Router();
route.get("/user", authorization, usersController.getUser);
route.patch("/account/:id", authorization, usersController.updateAccount);
route.patch("/change-password/:id", authorization, usersController.changePassword);

module.exports = route;