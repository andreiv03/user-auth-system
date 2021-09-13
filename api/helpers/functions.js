import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const createAccessToken = userId => {
  return jwt.sign(userId, config.accessToken, {
    expiresIn: "10m"
  });
}

export const createRefreshToken = userId => {
  return jwt.sign(userId, config.refreshToken, {
    expiresIn: "1d"
  });
}

export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}