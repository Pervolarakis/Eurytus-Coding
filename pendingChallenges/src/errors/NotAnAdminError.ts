import { CustomErrorClass } from "./CustomErrorClass";

export class NotAnAdminError extends CustomErrorClass{
    errorCode = 403
    constructor(){
        super('You need to be an admin!');
        Object.setPrototypeOf(this, NotAnAdminError.prototype)
        
    }
    getFormatedMessage(): string{
        return this.message;
    }
}