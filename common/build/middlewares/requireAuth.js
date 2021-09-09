"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var UnauthenticatedError_1 = require("../errors/UnauthenticatedError");
var requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        return next(new UnauthenticatedError_1.UnauthenticatedError());
    }
    next();
};
exports.requireAuth = requireAuth;
