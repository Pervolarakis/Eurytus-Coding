import { CustomErrorClass } from './CustomErrorClass';
export declare class BasicCustomError extends CustomErrorClass {
    message: string;
    errorCode: number;
    constructor(message: string, errorCode: number);
    getFormatedMessage(): string;
}
