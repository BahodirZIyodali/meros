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
exports.categories = void 0;
const typeorm_1 = require("typeorm");
const sub_categories_entity_1 = require("./sub_categories.entity");
let categories = class categories {
    category_id;
    title;
    sub_categories;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], categories.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 128,
    }),
    __metadata("design:type", String)
], categories.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_categories_entity_1.sub_categories, (Sub_categories) => Sub_categories.categories),
    __metadata("design:type", Array)
], categories.prototype, "sub_categories", void 0);
categories = __decorate([
    (0, typeorm_1.Entity)({
        name: "categories",
    })
], categories);
exports.categories = categories;
