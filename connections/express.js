import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";

import globalRouter from "../api/helpers/global-router.js";

export default app => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(fileUpload({ useTempFiles: true }));

  app.use(globalRouter());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error["status"] = 404;
    
    return next(error);
  });

  app.use((error, req, res, next) => {
    if (error.name === "UnauthorizedError") 
      return res.status(error.status).send({ message: error.message }).end();

    return next(error);
  });

  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({ errors: { message: error.message } });
  });
}