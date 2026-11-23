import { Router } from "express";
import { userValidation } from "../validators/user.validator.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userValidation, registerUser);
export default router;
