"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const validation_2 = require("../../validation/validation");
const subCategories_1 = __importDefault(require("./subCategories"));
const authRoutes = (0, express_1.Router)();
exports.default = authRoutes
    .get("/allSubCategories", subCategories_1.default.GET)
    .get("/SubCategory/:id", subCategories_1.default.GET_ONE_SUB_CATEGORY)
    .post("/create", (0, validation_1.default)(validation_2.PostSubCategorySchema), subCategories_1.default.POST)
    .put("/update/:id", (0, validation_1.default)(validation_2.UpdateSubCategorySchema), subCategories_1.default.PUT)
    .delete("/delete/:id", subCategories_1.default.DELETE);
