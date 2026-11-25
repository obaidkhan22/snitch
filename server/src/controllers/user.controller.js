import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import hashPassword from "../utils/hashPassword.js";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/tokens.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const refreshToken = createRefreshToken({
      userId: newUser._id,
      role: newUser.role,
    });
    const accessToken = createAccessToken({
      userId: newUser._id,
      role: newUser.role,
    });

    await User.findByIdAndUpdate(newUser._id, {
      refreshToken,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });

    await User.findOneAndUpdate(
      { email },
      {
        refreshToken,
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    return res.status(200).json({
      message: "Login Successfully",
      user: { email: user.email, username: user.username, role: user.role },
      accessToken,
    });
  } catch (error) {}
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token is requird" });

    const decoded = readRefreshToken(refreshToken);
    const { userId, role } = decoded;
    const user = await User.findById(userId);
    if (refreshToken != user.refreshToken) {
      await User.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(401).json({ message: "Refresh token mismatch" });
    }
    const newRefreshToken = createRefreshToken({ userId, role });
    const newAccessToken = createAccessToken({ userId, role });
    await User.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });
    return res.status(200).json({
      message: "Tokens rotated successfully",
      newAccessToken,
      data: {
        user: { email: user.email, username: user.username, role: user.role },
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
