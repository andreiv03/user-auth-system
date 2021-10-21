const { Router } = require("express");

const auth = require("./auth.route.js");
const users = require("./users.route.js");

const router = Router();
router.use("/auth", auth);
router.use("/users", users);

module.exports = router;