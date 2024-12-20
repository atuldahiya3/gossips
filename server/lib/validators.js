import { body, check, validationResult } from "express-validator";

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors.array().map((error) => error.msg);
  console.log(errorMessages);

  if (errors.isEmpty()) return next();
  else res.status(500).json({ error: errorMessages });
};
const registerValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("userName", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
  body("bio", "Please enter bio").notEmpty(),
  // check("avatar").notEmpty().withMessage("Please upload avatar"),
];
const loginValidator = () => [
  body("userName", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

const newGroupChatValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Select Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Please select minimum 2 members and maximum 100 members"),
];

const newRequestValidator=()=>{
    body("userId", "Please enter userId").notEmpty()
}



export { registerValidator, validationHandler, loginValidator,newGroupChatValidator,newRequestValidator };
