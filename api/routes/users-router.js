import express from "express";

import authController from "../controllers/users-controllers/auth-controller.js";
import accountController from "../controllers/users-controllers/account-controller.js";
import auth from "../middleware/auth.js";

export default globalRouter => {
  const router = express.Router();

  // Authentication
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/logout", authController.logout);
  router.get("/refresh-token", authController.refreshToken);

  // User's account
  router.get("/account", auth, accountController.getUser);

  globalRouter.use("/api", router);
}