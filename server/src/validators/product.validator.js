import { body, validationResult } from "express-validator";

const productValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 and 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Title can only be English language alphabets"),
  body("description")
    .exists("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be string")
    .bail()
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
    .bail()
    .isIn(["AFG", "USD"])
    .withMessage("Currency must be either AFG or USD"),

  body("sizes.*.sizes")
    .exists()
    .withMessage("Size must be exist in every entry of sizes array")
    .bail()
    .isString()
    .withMessage("Size should be of string value")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these. XS, S, M, L, XL, XXL."),
  body("size.*.stock")
    .exists()
    .withMessage("Stock must be exist in every entry of sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be of integer value."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid product data", errors: errors.array() });
    }
    next();
  },
];

export default productValidator;
