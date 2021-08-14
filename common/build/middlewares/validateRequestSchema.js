"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = void 0;
var express_validator_1 = require("express-validator");
var BasicCustomError_1 = require("../errors/BasicCustomError");
var validateRequestSchema = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BasicCustomError_1.BasicCustomError(errors.array().toString(), 400));
    }
    next();
};
exports.validateRequestSchema = validateRequestSchema;
