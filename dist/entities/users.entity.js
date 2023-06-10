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
exports.users = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const order_entity_1 = require("./order.entity");
let users = class users {
    user_id;
    user_number;
    password;
    user_mail;
    user_name;
    user_surname;
    user_was_born;
    user_s;
    user_img;
    Comments;
    Orders;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], users.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], users.prototype, "user_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 125,
    }),
    __metadata("design:type", String)
], users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 125,
    }),
    __metadata("design:type", String)
], users.prototype, "user_mail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], users.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
        nullable: true,
    }),
    __metadata("design:type", String)
], users.prototype, "user_surname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], users.prototype, "user_was_born", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 15,
        nullable: true,
    }),
    __metadata("design:type", String)
], users.prototype, "user_s", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], users.prototype, "user_img", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comments, (Comments) => Comments.users),
    __metadata("design:type", Array)
], users.prototype, "Comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Orders, (order) => order.costumer),
    __metadata("design:type", order_entity_1.Orders)
], users.prototype, "Orders", void 0);
users = __decorate([
    (0, typeorm_1.Entity)({
        name: "users",
    })
], users);
exports.users = users;
