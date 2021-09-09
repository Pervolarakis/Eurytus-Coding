import { CustomErrorClass } from "./CustomErrorClass";
export declare class UnauthenticatedError extends CustomErrorClass {
    errorCode: number;
    constructor();
    getFormatedMessage(): string;
}
