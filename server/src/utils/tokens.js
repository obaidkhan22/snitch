import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createAccessToken = ({ userId, role }) => {
  return jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET);
};

export const createRefreshToken = ({ userId, role }) => {
  return jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET);
};
