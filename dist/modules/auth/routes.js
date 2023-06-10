"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verify_1 = __importDefault(require("../../middleware/verify"));
const validation_2 = require("../../validation/validation");
const auth_1 = __importDefault(require("./auth"));
const authRoutes = (0, express_1.Router)();
exports.default = authRoutes
    .post("/login", (0, validation_1.default)(validation_2.LoginPostSchema), auth_1.default.LOGIN)
    .post("/registor", (0, validation_1.default)(validation_2.RegistorPostSchema), auth_1.default.POST_REGISTOR)
    .put("/updateUser", (0, validation_1.default)(validation_2.UpdatePostSchema), verify_1.default, auth_1.default.UPDATE);
