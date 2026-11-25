import { Router } from "express";
import {
  loginValidator,
  userValidation,
} from "../validators/user.validator.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userValidation, registerUser);
router.post("/login", loginValidator, loginUser);
export default router;
