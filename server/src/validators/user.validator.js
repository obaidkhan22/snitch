import { body, validationResult } from "express-validator";

export const userValidation = [
  body("email")
    .exists()
    .withMessage("Email is required.")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address."),

  body("username")
    .exists()
    .withMessage("username is required.")
    .bail()
    .isString()
    .withMessage("username should be string.")
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage("username should be between 2 and 25 characters."),

  body("password")
    .exists()
    .withMessage("Password is requird.")
    .bail()
    .isString()
    .withMessage("Password should be string.")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum of 6 characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid request", errors: errors.array() });

    next();
  },
];

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required.")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address."),
  body("password")
    .exists()
    .withMessage("Password is requird.")
    .bail()
    .isString()
    .withMessage("Password should be string.")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum of 6 characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid data", errors: errors.array() });

    next();
  },
];
