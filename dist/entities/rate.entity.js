"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluation = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let Evaluation = class Evaluation {
    id;
    star;
    increment;
    average;
    Products;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Evaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "star", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "increment", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Evaluation.prototype, "average", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.products, (Products) => Products.Evaluation),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entity_1.products)
], Evaluation.prototype, "Products", void 0);
Evaluation = __decorate([
    (0, typeorm_1.Entity)({
        name: "evaluation",
    })
], Evaluation);
exports.Evaluation = Evaluation;
