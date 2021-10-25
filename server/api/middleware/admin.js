const { ADMINS } = require("../../constants"); 
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "The user does not exist." });

    if (!ADMINS.includes(user.email))
      return res.status(400).json({ message: "You do not have administrator privileges!" }); 

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}