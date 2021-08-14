import { ValidationError } from "express-validator";
import { CustomErrorClass } from "./CustomErrorClass";
export declare class RequestValidationError extends CustomErrorClass {
    errors: ValidationError[];
    errorCode: number;
    constructor(errors: ValidationError[]);
    getFormatedMessage(): string;
}
