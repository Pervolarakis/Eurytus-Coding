"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var CustomErrorClass_1 = require("../errors/CustomErrorClass");
var RequestValidationError_1 = require("../errors/RequestValidationError");
var ErrorHandler = function (err, req, res, next) {
    if (err instanceof CustomErrorClass_1.CustomErrorClass) {
        res.status(err.errorCode).json({ success: false, error: err.getFormatedMessage() });
        return next();
    }
    if (err instanceof RequestValidationError_1.RequestValidationError) {
        res.status(err.errorCode).json({ success: false, error: err.getFormatedMessage() });
        return next();
    }
    else {
        res.status(400).json({ success: false, error: 'An error occurred!' });
        return next();
    }
};
exports.ErrorHandler = ErrorHandler;
