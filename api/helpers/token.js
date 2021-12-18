const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../constants");

module.exports = {
  signToken: (sub, expiresIn) => {
    return new Promise((resolve, reject) => {
      jwt.sign({
        sub,
        iat: Date.now()
      }, JWT_SECRET, { expiresIn }, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },
  verifyToken: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded);
      });
    });
  }
};