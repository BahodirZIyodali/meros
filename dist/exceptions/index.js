"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    message;
    status;
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.ErrorHandler = ErrorHandler;
