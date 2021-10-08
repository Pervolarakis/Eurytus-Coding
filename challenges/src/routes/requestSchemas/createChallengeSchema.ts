import { body } from "express-validator";

export const createChallengeSchema = [
    body('name')
        .exists({checkFalsy: true})
        .withMessage("Name cant be empty")
        .bail()
        .trim()
        .isLength({min: 6})
        .withMessage('Name has to be longer than 6 characters'),
    body('description')
        .exists({checkFalsy: true})
        .withMessage("Description cant be empty")
        .bail()
        .trim()
        .isLength({min: 6})
        .withMessage('Description has to be longer than 6 characters'),
    body('difficulty')
        .exists({checkFalsy: true})
        .withMessage("Difficulty cant be empty")
        .bail()
        .trim()
        .isInt({min: 1, max: 5})
        .withMessage('Difficulty has to be a number between 1 and 5'),
    body('isPublic')
        .exists({checkFalsy: true})
        .withMessage("Is Public cant be empty")
        .bail()
        .trim()
        .isBoolean()
        .withMessage('Is public should be true or false'),
    body('startsAt')
        .exists({checkFalsy: true})
        .withMessage("Starts at cant be empty")
        .bail()
        .custom(value => Date.parse(value))
        .withMessage('Starts at has to be a valid date'),
    body('expiresAt')
        .exists({checkFalsy: true})
        .withMessage("Expires at cant be empty")
        .bail()
        .custom(value => Date.parse(value))
        .withMessage('Expires at has to be a valid date'),
    body('expectedOutputTests')
        .exists()
        .withMessage("Template is required"),
    body('expectedStructure')
        .exists()
        .withMessage("Template is required"),
    body('expectedDesignPatterns')
        .exists()
        .withMessage("Template is required"),
    body('language')
        .exists({checkFalsy: true})
        .withMessage("Language cant be empty")
        .bail()
        .trim()
        .isIn(['c','js','java'])
        .withMessage('Language should be one of the supported languages'),
    body('template')
        .exists()
        .withMessage("Template is required"),
    body('message')
        .optional()
        .exists({checkFalsy: true})
        .withMessage("Message cant be empty")
        .bail()
        .trim()
        .isLength({min: 6})
        .withMessage('Message has to be longer than 6 characters'),
]
