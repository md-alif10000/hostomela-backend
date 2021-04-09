const { check, validationResult } = require("express-validator");
exports.validateRegisterRequest = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength(11)
    .withMessage("Phone shold be 11 digit"),
  // check("gender").notEmpty().withMessage("Your gender is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character"),
];

exports.isRegisterRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({
      error: errors.array()[0].msg,
    });
  } else {
    next();
  }
};





exports.validateLoginRequest = [
	check("phone").isLength({min:11}).withMessage("Valid Phone number is required"),
	check("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 character"),
];




exports.isLoginRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({
      error: errors.array()[0].msg,
    });
  } else {
    next();
  }
};