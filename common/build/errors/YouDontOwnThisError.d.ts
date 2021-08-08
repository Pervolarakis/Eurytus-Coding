import { CustomErrorClass } from './CustomErrorClass';
export declare class BasicCustomError extends CustomErrorClass {
    property: string;
    errorCode: number;
    constructor(property: string);
    getFormatedMessage(): string;
}
