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
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const users_entity_1 = require("./users.entity");
let Comments = class Comments {
    comment_id;
    commentary;
    products;
    users;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Comments.prototype, "comment_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 600,
    }),
    __metadata("design:type", String)
], Comments.prototype, "commentary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.products, (Products) => Products.Comments),
    __metadata("design:type", product_entity_1.products)
], Comments.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.users, (users) => users.Comments),
    __metadata("design:type", users_entity_1.users
    // ManyToOne(() => sub_sub_categories, (Sub_sub_categories) => Sub_sub_categories.products)
    // sub_sub_categories: sub_sub_categories
    )
], Comments.prototype, "users", void 0);
Comments = __decorate([
    (0, typeorm_1.Entity)({
        name: "comments",
    })
], Comments);
exports.Comments = Comments;
