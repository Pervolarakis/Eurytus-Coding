import { CustomErrorClass } from './CustomErrorClass';
export declare class YouDontOwnThisError extends CustomErrorClass {
    property: string;
    errorCode: number;
    constructor(property: string);
    getFormatedMessage(): string;
}
