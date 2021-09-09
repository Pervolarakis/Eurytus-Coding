export declare abstract class CustomErrorClass extends Error {
    abstract errorCode: number;
    constructor(message: string);
    abstract getFormatedMessage(): string;
}
