import { body, param, query, validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error(400, errors.array()[0].msg);
  }
  next();
};

export const validateSignup = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Tên không được để trống")
    .bail()
    .isString()
    .withMessage("Tên phải là chuỗi")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Tên từ 3 đến 30 kí tự")
    .bail()
    .matches(/^[\p{L}0-9 ]+$/u)
    .withMessage("Tên là chữ cái và khoảng trắng")
    .bail(),

  body("username")
    .not()
    .isEmpty()
    .withMessage("Tên đăng nhập không được để trống")
    .bail()
    .isString()
    .withMessage("Tên đăng nhập phải là chuỗi")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Tên đăng nhập từ 6 đến 30 kí tự")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Tên đăng nhập không được chứa số và kí tự")
    .bail(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Mật khẩu không được để trống")
    .bail()
    .isString()
    .withMessage("Mật khẩu phải là chuỗi")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Mật khẩu từ 6 đến 30 kí tự")
    .bail()
    .matches(/^\S*$/)
    .withMessage("Mật khẩu không chứa khoảng trắng")
    .bail(),

  validateRequest,
];

export const validateSignin = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Tên đăng nhập không được để trống")
    .bail()
    .isString()
    .withMessage("Tên đăng nhập phải là chuỗi")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Tên đăng nhập từ 6 đến 30 kí tự")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Tên đăng nhập không được chứa số và kí tự")
    .bail(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Mật khẩu không được để trống")
    .bail()
    .isString()
    .withMessage("Mật khẩu phải là chuỗi")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Mật khẩu từ 6 đến 30 kí tự")
    .bail()
    .matches(/^\S*$/)
    .withMessage("Mật khẩu không chứa khoảng trắng")
    .bail(),

  validateRequest,
];

export const validatePostRegion = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),

  body("description")
    .not()
    .isEmpty()
    .withMessage("Descriptionmust not be empty")
    .bail()
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  validateRequest,
];

export const validatePutRegion = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),

  body("description")
    .not()
    .isEmpty()
    .withMessage("Descriptionmust not be empty")
    .bail()
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  body("isDeleted")
    .not()
    .isEmpty()
    .withMessage("isDeleted not be empty")
    .bail()
    .isBoolean()
    .withMessage("Descriptionmust be boolean")
    .bail(),

  validateRequest,
];

export const validateId = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id must not be empty")
    .bail()
    .isString()
    .withMessage("Id must be a string")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be 24 characters long")
    .bail()
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Invalid Id")
    .bail(),

  validateRequest,
];

export const validatePostProvince = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),

  validateRequest,
];

export const validatePostDestination = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 6, max: 100 })
    .withMessage("Name must be between 6 and 100 characters long")
    .bail(),

  body("image").optional().isString().withMessage("Image be a string").bail(),

  body("description")
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  body("category.categoryId")
    .not()
    .isEmpty()
    .withMessage("categoryId must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid categoryId")
    .bail(),

  body("category.subcategoryId")
    .not()
    .isEmpty()
    .withMessage("subcategoryId must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid subcategoryId")
    .bail(),
  validateRequest,
];

export const validateReview = [
  body("rating")
    .not()
    .isEmpty()
    .withMessage("Rating must not be empty")
    .bail()
    .isNumeric()
    .withMessage("Rating must be number")
    .bail(),

  body("comment")
    .optional()
    .isString()
    .withMessage("Destination type id must be a string")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters long")
    .bail(),

  body("userId")
    .not()
    .isEmpty()
    .withMessage("User id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid user id")
    .bail(),

  body("destinationId")
    .not()
    .isEmpty()
    .withMessage("Destination id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid destination id")
    .bail(),

  validateRequest,
];

export const validatePutUser = [
  body("avatarr").optional().isURL().withMessage("Avatar must be url").bail(),

  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters long")
    .bail(),

  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Username must be between 6 and 30 characters long")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username must not contain spaces or special characters")
    .bail(),

  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .matches(/^\S*$/)
    .withMessage("Password must not contain spaces")
    .bail(),

  validateRequest,
];

export const validatePostDistrict = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),

  body("provinceId")
    .not()
    .isEmpty()
    .withMessage("provinceId must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid provinceId")
    .bail(),

  validateRequest,
];

export const validatePostWard = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),

  body("districtId")
    .not()
    .isEmpty()
    .withMessage("districtId must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid districtId")
    .bail(),

  validateRequest,
];

export const validateName = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),
  validateRequest,
];
export const validatePostSubcategory = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail(),
  body("categoryId")
    .not()
    .isEmpty()
    .withMessage("categoryId must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid categoryId")
    .bail(),
  validateRequest,
];

export const validateGenerateTrip = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid user id")
    .bail(),

  body("location")
    .not()
    .isEmpty()
    .withMessage("location must not be empty")
    .bail(),

  body("noOfDay")
    .not()
    .isEmpty()
    .withMessage("noOfDay must not be empty")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("noOfDay must be a natural number between 1 and 5")
    .bail(),

  body("traveler")
    .not()
    .isEmpty()
    .withMessage("traveler must not be empty")
    .bail(),

  body("budget").not().isEmpty().withMessage("budget must not be empty").bail(),

  validateRequest,
];
