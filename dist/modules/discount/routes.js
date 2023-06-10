"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const validation_2 = require("../../validation/validation");
const discount_1 = __importDefault(require("./discount"));
const Routes = (0, express_1.Router)();
exports.default = Routes.put("/update/:id", (0, validation_1.default)(validation_2.UpdateDiscountSchema), discount_1.default.UPDATE);
