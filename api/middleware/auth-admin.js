const config = require("../../config/config.js");
const Users = require("../../models/users-model.js");

module.exports = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");

    if (!config.admins.includes(user.email))
      return res.status(400).json({ message: "You do not have administrator privileges!" });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}