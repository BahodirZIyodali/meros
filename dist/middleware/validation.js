"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
exports.default = (schema) => {
    return (req, res, next) => {
        try {
            const { value, error } = schema.validate(req.body);
            if (error) {
                next(res.json({
                    message: error.message,
                }));
            }
            req.filtered = value;
            next();
        }
        catch (error) {
            next(new exceptions_1.ErrorHandler(error, 500));
        }
    };
};
