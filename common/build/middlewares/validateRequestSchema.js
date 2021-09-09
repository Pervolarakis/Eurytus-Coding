"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = void 0;
var express_validator_1 = require("express-validator");
var RequestValidationError_1 = require("../errors/RequestValidationError");
var validateRequestSchema = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new RequestValidationError_1.RequestValidationError(errors.array()));
    }
    next();
};
exports.validateRequestSchema = validateRequestSchema;
