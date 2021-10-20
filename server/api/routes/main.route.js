const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = route;