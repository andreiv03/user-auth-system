const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../../config/config.js");
const Users = require("../../models/users-model.js");
const { createAccessToken, createRefreshToken } = require("../helpers/tokens.js");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ message: "This email address has already been registered." });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        path: "/api/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "None",
        secure: true
      });

      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "This user does not exist." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "The password is incorrect." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        path: "/api/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "None",
        secure: true
      });

      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        path: "/api/refresh-token"
      });

      return res.json({ message: "You have successfully logged out!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(400).json({ message: "You must log in before doing this!" });

      jwt.verify(refreshToken, config.refreshToken, (error, user) => {
        if (error) return res.status(400).json({ message: "You must log in before doing this!" });

        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}