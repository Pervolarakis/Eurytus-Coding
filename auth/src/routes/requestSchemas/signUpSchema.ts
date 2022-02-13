import { body } from "express-validator";

export const signUpSchema = [
    body('email')
        .exists({checkFalsy: true})
        .withMessage("Email cant be empty")
        .bail()
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .exists({checkFalsy: true})
        .withMessage("Password cant be empty")
        .bail()
        .trim()
        .isLength({min: 6})
        .withMessage('Password has to be longer than 6 characters'),
    body('firstName')
        .exists({checkFalsy: true})
        .withMessage("First name cant be empty")
        .bail()
        .trim()
        .isLength({min: 4})
        .withMessage('First name has to be longer than 6 characters'),
    body('lastName')
        .exists({checkFalsy: true})
        .withMessage("Last name cant be empty")
        .bail()
        .trim()
        .isLength({min: 4})
        .withMessage('Last name has to be longer than 6 characters'),
]