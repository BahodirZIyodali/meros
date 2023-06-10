"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sortProducts_1 = __importDefault(require("./sortProducts"));
const Routes = (0, express_1.Router)();
exports.default = Routes.get("/discount", sortProducts_1.default.GET_SORT_BY_DISCOUNT)
    .get("/star", sortProducts_1.default.GET_SORT_BY_START)
    .get("/soldProduct", sortProducts_1.default.GET_SORT_BY_SOLD)
    .get("/NewDateProduct", sortProducts_1.default.GET_SORT_BY_DATE_NOW)
    .get("/OldDateProduct", sortProducts_1.default.GET_SORT_BY_DATE_OLD);
