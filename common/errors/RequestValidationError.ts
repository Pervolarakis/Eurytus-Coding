import { ValidationError } from "express-validator";
import { CustomErrorClass } from "./CustomErrorClass";

export class RequestValidationError extends CustomErrorClass{
    errorCode = 400
    constructor(public errors: ValidationError[]){
        super(errors.toString());
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    getFormatedMessage():string{
        const formattedErrors = this.errors.map(error=>{
            return {message: error.msg, field: error.param}
        })
        return JSON.stringify(formattedErrors);
    }
}