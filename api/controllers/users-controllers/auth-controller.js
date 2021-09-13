import bcrypt from "bcrypt";

import config from "../../../config/config.js";
import Users from "../../../models/users-model.js";
import { createAccessToken, createRefreshToken, validateEmail } from "../../helpers/functions.js";

export default {
  register: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password)
        return res.status(400).json({ message: "Please fill in all the fields!" });

      else if (!validateEmail(email))
        return res.status(400).json({ message: "The email address is invalid." });

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ message: "This email address has already been registered." });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        first_name,
        last_name, 
        email, 
        password: hashedPassword
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh-token",
        maxAge: 7*24*60*60*1000,
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
      if (!user) return res.status(400).json({ message: "This user does not exist!" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "The password is incorrect!" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh-token",
        maxAge: 7*24*60*60*1000,
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
        return res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}