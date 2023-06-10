"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
exports.default = (err, req, res, next) => {
    if (err instanceof exceptions_1.ErrorHandler) {
        res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
        return;
    }
    res.status(500).json({
        message: "Internal Server Error",
        status: 500,
    });
};
