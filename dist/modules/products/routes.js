"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const validation_2 = require("../../validation/validation");
const products_1 = __importDefault(require("./products"));
const authRoutes = (0, express_1.Router)();
exports.default = authRoutes
    .get("/allProducts", products_1.default.GET)
    .get("/oneProduct/:id", products_1.default.GET_ONE_PRODUCT)
    .post("/create", (0, validation_1.default)(validation_2.PostProductSchema), products_1.default.POST)
    .put("/update/:id", (0, validation_1.default)(validation_2.UpdateProductSchema), products_1.default.PUT)
    .delete("/delete/:id", products_1.default.DELETE);
