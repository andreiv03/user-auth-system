import express from "express";

import usersRouter from "../routes/users-router.js";

export default () => {
  const globalRouter = express.Router();
  
  usersRouter(globalRouter);

  return globalRouter;
}