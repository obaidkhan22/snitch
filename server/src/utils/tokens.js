import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createAccessToken = ({ userId, role }) => {
  return jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = ({ userId, role }) => {
  return jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7days",
  });
};

export const readRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
};
