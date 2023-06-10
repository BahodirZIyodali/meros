"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../exceptions/index");
const jwt_1 = require("../utils/jwt");
dotenv_1.default.config();
exports.default = (req, res, next) => {
    const { access_token } = req.headers;
    if (!access_token) {
        return next(new index_1.ErrorHandler("Provided access token", 401));
    }
    const token = (0, jwt_1.verify)(access_token);
    req.filtered.id = token;
    next();
};
