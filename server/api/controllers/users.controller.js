const bcrypt = require("bcrypt");
const { Users } = require("../models");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ message: "The user does not exist." });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateAccount: async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber } = req.body;
      
      const user = await Users.findById(req.params.id);
      if (!user) return res.status(400).json({ message: "The user does not exist." });

      await Users.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        email,
        phoneNumber
      });

      return res.status(200).json({ message: "Your account has been updated." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await Users.findById(req.params.id);
      if (!user) return res.status(400).json({ message: "The user does not exist." });

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(400).json({ message: "The current password is incorrect." });

      const passwordHash = await bcrypt.hash(newPassword, 10);
      await Users.findByIdAndUpdate(req.params.id, { password: passwordHash });

      return res.status(200).json({ message: "The password has been changed." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};