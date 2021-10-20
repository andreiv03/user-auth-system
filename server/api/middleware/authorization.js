const { token } = require("../helpers");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) return res.status(400).json({ message: "Unauthorized!" });

    const decodedToken = await token.verifyToken(authorization);
    if (!decodedToken) return res.status(400).json({ message: "Unauthorized!" });

    req.user = {
      id: decodedToken.sub
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};