import { body, validationResult } from "express-validator";

export const userValidation = [
  body("email")
    .exists()
    .withMessage("Email is required.")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address."),

  body("name")
    .exists()
    .withMessage("Name is required.")
    .bail()
    .isString()
    .trim()
    .withMessage("Name should be string.")
    .length({ min: 2, max: 25 })
    .withMessage("Name should be between 2 and 25 characters."),

  body("password")
    .exists()
    .withMessage("Password is requird.")
    .bail()
    .isString()
    .withMessage("Password should be string.")
    .trim()
    .length({ min: 6 })
    .withMessage("Password must be minimum of 6 characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.length > 0)
      return res.status(400).json({ message: "Invalid request", errors });

    next();
  },
];
