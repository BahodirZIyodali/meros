"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sign = (payload) => jsonwebtoken_1.default.sign(payload, String(process.env.SECRET_KEY));
exports.sign = sign;
const verify = (token) => jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
exports.verify = verify;
