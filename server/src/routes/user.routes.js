import { Router } from "express";
import {
  loginValidator,
  userValidation,
} from "../validators/user.validator.js";
import {
  getMe,
  loginUser,
  refresh,
  registerUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", userValidation, registerUser);
router.post("/login", loginValidator, loginUser);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);
export default router;
