import { body, validationResult } from "express-validator";

const productValidator = [
  body("title").exists().withMessage("Title is required").bail(),
  isString()
    .withMessage("Title must be string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 and 100 characters")
    .isAlpha("en-US")
    .withMessage("Title can only be English language alphabets"),
  body("description")
    .exists("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be string")
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description must be between 20 and 500 characters"),
  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and must be minimum of 0",
    ),
  body("price.currency")
    .exists()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be a string value")
    .isIn(["AFG", "USD"])
    .withMessage("Currency must be either AFG or USD"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid product data" });
    }
    next();
  },
];

export default productValidator;
