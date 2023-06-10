"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./auth/routes"));
const routes_2 = __importDefault(require("./categories/routes"));
const routes_3 = __importDefault(require("./subCategories/routes"));
const routes_4 = __importDefault(require("./sub_subCategories/routes"));
const routes_5 = __importDefault(require("./products/routes"));
const routes_6 = __importDefault(require("./comments/routes"));
const routes_7 = __importDefault(require("./evaluation/routes"));
const routes_8 = __importDefault(require("./discount/routes"));
const routes_9 = __importDefault(require("./orders/routes"));
const routes_10 = __importDefault(require("./sortProducts/routes"));
const router = (0, express_1.Router)();
exports.default = router
    .use("/auth", routes_1.default)
    .use("/categories", routes_2.default)
    .use("/subCategories", routes_3.default)
    .use("/SubSubCategories", routes_4.default)
    .use("/product", routes_5.default)
    .use("/comment", routes_6.default)
    .use("/evaluation", routes_7.default)
    .use("/ ", routes_8.default)
    .use("/orders", routes_9.default)
    .use("/sortproduct", routes_10.default);
