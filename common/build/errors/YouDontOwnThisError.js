"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCustomError = void 0;
var CustomErrorClass_1 = require("./CustomErrorClass");
var BasicCustomError = /** @class */ (function (_super) {
    __extends(BasicCustomError, _super);
    function BasicCustomError(property) {
        var _this = _super.call(this, "You dont own this " + property) || this;
        _this.property = property;
        _this.errorCode = 403;
        Object.setPrototypeOf(_this, BasicCustomError.prototype);
        return _this;
    }
    BasicCustomError.prototype.getFormatedMessage = function () {
        return "You dont own this " + this.property;
    };
    return BasicCustomError;
}(CustomErrorClass_1.CustomErrorClass));
exports.BasicCustomError = BasicCustomError;
