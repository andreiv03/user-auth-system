const { Router } = require("express");

const route = Router();
const { authController } = require("../controllers");

route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/logout", authController.logout);
route.get("/refresh-token", authController.refreshToken);

module.exports = route;