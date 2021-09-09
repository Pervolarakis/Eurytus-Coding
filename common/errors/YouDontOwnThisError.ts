import {CustomErrorClass} from './CustomErrorClass';

export class YouDontOwnThisError extends CustomErrorClass{    
    errorCode = 403;
    constructor(public property: string){
        super(`You dont own this ${property}`);
        Object.setPrototypeOf(this, YouDontOwnThisError.prototype)
    }
    getFormatedMessage(): string{
        return `You dont own this ${this.property}`;
    }

}