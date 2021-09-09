"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var CustomErrorClass_1 = require("../errors/CustomErrorClass");
var ErrorHandler = function (err, req, res, next) {
    if (err instanceof CustomErrorClass_1.CustomErrorClass) {
        res.status(err.errorCode).json({ success: false, error: err.getFormatedMessage() });
        return next();
    }
    else {
        res.status(500).json({ success: false, error: err.message });
        return next();
    }
};
exports.ErrorHandler = ErrorHandler;
