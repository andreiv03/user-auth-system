const { Router } = require("express");

const main = require("./main.route.js");
const auth = require("./auth.route.js");
const users = require("./users.route.js");

const router = Router();
router.use("/", main);
router.use("/auth", auth);
router.use("/users", users);

module.exports = router;