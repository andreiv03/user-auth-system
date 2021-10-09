const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

module.exports = {
  createAccessToken: userId => {
    return jwt.sign(userId, config.accessToken, {
      expiresIn: "10m"
    });
  },
  createRefreshToken: userId => {
    return jwt.sign(userId, config.refreshToken, {
      expiresIn: "7d"
    });
  }
}