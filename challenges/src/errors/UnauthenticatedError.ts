import { CustomErrorClass } from "./CustomErrorClass";

export class UnauthenticatedError extends CustomErrorClass{
    errorCode = 401
    constructor(){
        super('Not authenticated');
        Object.setPrototypeOf(this, UnauthenticatedError.prototype)
        
    }
    getFormatedMessage(): string{
        return this.message;
    }
}