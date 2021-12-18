const { Router } = require("express");
const { authController } = require("../controllers");

const route = Router();
route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/logout", authController.logout);
route.get("/refresh-token", authController.refreshToken);

module.exports = route;