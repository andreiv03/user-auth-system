const bcrypt = require("bcrypt");
const { Users } = require("../models");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ message: "The user does not exist." });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, value } = req.body;
      const getFieldName = () => {
        const separatedWords = name.replace(/([A-Z])/g, " $1");
        return separatedWords.charAt(0).toUpperCase() + separatedWords.slice(1);
      }

      await Users.findByIdAndUpdate(req.params.id, { [name]: value });
      return res.json({ message: `${getFieldName()} field has been updated.` });
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

      return res.json({ message: "The password has been changed." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};