"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verify_1 = __importDefault(require("../../middleware/verify"));
const validation_2 = require("../../validation/validation");
const orders_1 = __importDefault(require("./orders"));
const Routes = (0, express_1.Router)();
exports.default = Routes.get("/myproducts", orders_1.default.GET).post("/create", (0, validation_1.default)(validation_2.PostOrderSchema), verify_1.default, orders_1.default.POST);
