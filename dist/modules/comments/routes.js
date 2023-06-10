"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const validation_2 = require("../../validation/validation");
const comments_1 = __importDefault(require("./comments"));
const authRoutes = (0, express_1.Router)();
exports.default = authRoutes
    .post("/create", (0, validation_1.default)(validation_2.PostCommentSchema), comments_1.default.POST)
    .put("/update/:id", (0, validation_1.default)(validation_2.UpdateCommentSchema), comments_1.default.PUT)
    .delete("/delete/:id", comments_1.default.DELETE);
