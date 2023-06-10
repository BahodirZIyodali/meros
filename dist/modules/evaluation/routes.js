"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const validation_2 = require("../../validation/validation");
const rate_1 = __importDefault(require("./rate"));
const Routes = (0, express_1.Router)();
exports.default = Routes.put("/rate/:id", (0, validation_1.default)(validation_2.UpdateRateSchema), rate_1.default.UPDATE_RATE);
