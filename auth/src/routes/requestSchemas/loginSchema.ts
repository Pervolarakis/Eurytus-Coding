import { body } from "express-validator";

export const loginSchema = [
    body('email')
        .exists({checkFalsy: true})
        .withMessage("Email cant be empty")
        .bail()
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .exists({checkFalsy: true})
        .withMessage("Password cant be empty")
];