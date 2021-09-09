import { CustomErrorClass } from "./CustomErrorClass";
export declare class NotAnAdminError extends CustomErrorClass {
    errorCode: number;
    constructor();
    getFormatedMessage(): string;
}
