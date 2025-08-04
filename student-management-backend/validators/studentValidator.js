const { body, validationResult } = require("express-validator");

exports.validateStudent = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("age")
    .isInt({ min: 1 })
    .withMessage("Age must be a positive number"),

  body("course")
    .notEmpty()
    .withMessage("Course is required"),

  body("courseStatus")
    .optional() // optional if you're using default
    .isIn(["Active", "Inactive"])
    .withMessage("Course status must be either 'Active' or 'Inactive'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];