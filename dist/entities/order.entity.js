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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const users_entity_1 = require("./users.entity");
let Orders = class Orders {
    OrderId;
    count;
    costumer;
    Products;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Orders.prototype, "OrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Orders.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.users, (users) => users.Orders),
    __metadata("design:type", users_entity_1.users)
], Orders.prototype, "costumer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.products, (Products) => Products.Orders),
    __metadata("design:type", product_entity_1.products)
], Orders.prototype, "Products", void 0);
Orders = __decorate([
    (0, typeorm_1.Entity)({
        name: "orders",
    })
], Orders);
exports.Orders = Orders;
