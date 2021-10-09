const globalRouter = require("express").Router();

const usersRouter = require("../routes/users-router.js");

module.exports = () => {
  globalRouter.use("/api", usersRouter());

  return globalRouter;
}