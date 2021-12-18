const bcrypt = require("bcrypt");

const { ADMINS } = require("../../constants");
const { Users } = require("../models");
const { token } = require("../helpers");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ message: "This email address has already been registered." });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: ADMINS.includes(email)
      });

      const accessToken = await token.signToken(newUser._id, "10m");
      const refreshToken = await token.signToken(newUser._id, "7d");

      res.cookie("refreshToken", refreshToken, {
        path: "/api/auth/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "None",
        secure: true
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "The user does not exist." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "The password is incorrect." });

      const accessToken = await token.signToken(user._id, "10m");
      const refreshToken = await token.signToken(user._id, "7d");

      res.cookie("refreshToken", refreshToken, {
        path: "/api/auth/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "None",
        secure: true
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        path: "/api/auth/refresh-token"
      });

      return res.status(200).json({ message: "You have successfully logged out!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(400).json({ message: "You must log in before doing this!" });

      const decodedToken = await token.verifyToken(refreshToken);
      if (!decodedToken) return res.status(400).json({ message: "You must log in before doing this!" });

      const accessToken = await token.signToken(decodedToken.sub, "10m");
      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};