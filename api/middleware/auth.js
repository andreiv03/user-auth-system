import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ message: "Invalid authentication!" });

    jwt.verify(token, config.accessToken, (error, user) => {
      if (error) return res.status(400).json({ message: "Invalid authentication!" });
      req.user = user;
    });

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}