import User from "../models/user.model.js";
import hashPassword from "../utils/hashPassword.js";

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
    return res.status(201).json({
      message: "User created successfully.",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
