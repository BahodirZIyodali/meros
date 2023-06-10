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
exports.products = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const order_entity_1 = require("./order.entity");
const rate_entity_1 = require("./rate.entity");
const sub_sub_categories_entity_1 = require("./sub_sub_categories.entity");
let products = class products {
    productId;
    title;
    price;
    // @Column({
    //     type : "character varying"
    // })
    // comment :string
    discont_price;
    sold_count;
    brand;
    size;
    // @Column({
    //     type : "character varying",
    //     length : 64
    // })
    // netto : string
    author;
    description;
    color;
    made_in;
    discount;
    time;
    img;
    img1;
    img2;
    img3;
    img4;
    sub_sub_categories;
    Orders;
    Comments;
    Evaluation;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], products.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 200,
    }),
    __metadata("design:type", String)
], products.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "discont_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], products.prototype, "sold_count", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], products.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], products.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 128,
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 128,
    }),
    __metadata("design:type", String)
], products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], products.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 64,
    }),
    __metadata("design:type", String)
], products.prototype, "made_in", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], products.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], products.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], products.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "img1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "img2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "img3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], products.prototype, "img4", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_sub_categories_entity_1.sub_sub_categories, (Sub_sub_categories) => Sub_sub_categories.products),
    __metadata("design:type", sub_sub_categories_entity_1.sub_sub_categories)
], products.prototype, "sub_sub_categories", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Orders, (orders) => orders.Products),
    __metadata("design:type", order_entity_1.Orders)
], products.prototype, "Orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comments, (Comments) => Comments.products),
    __metadata("design:type", Array)
], products.prototype, "Comments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rate_entity_1.Evaluation, (evaluation) => evaluation.Products),
    __metadata("design:type", Array)
], products.prototype, "Evaluation", void 0);
products = __decorate([
    (0, typeorm_1.Entity)({
        name: "products",
    })
], products);
exports.products = products;
