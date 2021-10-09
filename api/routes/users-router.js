const router = require("express").Router();

const authController = require("../controllers/auth-controller.js");
const accountController = require("../controllers/account-controller.js");
const auth = require("../middleware/auth.js");

module.exports = () => {
  // Authentication
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/logout", authController.logout);
  router.get("/refresh-token", authController.refreshToken);

  // User Account
  router.get("/account", auth, accountController.getUser);

  return router;
}