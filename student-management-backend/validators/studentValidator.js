const { body,validationResult } = require("express-validator");

exports.validateStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("age").isInt({ min: 1 }).withMessage("Age must be a positive number"),
  body("course").notEmpty().withMessage("Course is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
