import { ValidationError } from "express-validator";
export declare class RequestValidationError extends Error {
    errors: ValidationError[];
    errorCode: number;
    constructor(errors: ValidationError[]);
    getFormatedMessage(): {
        message: any;
        field: string;
    }[];
}
