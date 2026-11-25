import { readAccessToken } from "../utils/tokens.js";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken)
    return res
      .status(400)
      .json({ message: "Access Denied. No Access token found." });

  try {
    const decoded = readAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired access token." });
  }
};
