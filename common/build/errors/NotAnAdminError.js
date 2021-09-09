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
exports.NotAnAdminError = void 0;
var CustomErrorClass_1 = require("./CustomErrorClass");
var NotAnAdminError = /** @class */ (function (_super) {
    __extends(NotAnAdminError, _super);
    function NotAnAdminError() {
        var _this = _super.call(this, 'You need to be an admin!') || this;
        _this.errorCode = 403;
        Object.setPrototypeOf(_this, NotAnAdminError.prototype);
        return _this;
    }
    NotAnAdminError.prototype.getFormatedMessage = function () {
        return this.message;
    };
    return NotAnAdminError;
}(CustomErrorClass_1.CustomErrorClass));
exports.NotAnAdminError = NotAnAdminError;
