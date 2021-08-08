import {CustomErrorClass} from './CustomErrorClass';

export class BasicCustomError extends CustomErrorClass{    
    errorCode = 403;
    constructor(public property: string){
        super(`You dont own this ${property}`);
        Object.setPrototypeOf(this, BasicCustomError.prototype)
    }
    getFormatedMessage(): string{
        return `You dont own this ${this.property}`;
    }

}