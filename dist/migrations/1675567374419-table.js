"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675567374419 = void 0;
class table1675567374419 {
    name = 'table1675567374419';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_ebc48c6a0bfb5c908ab996c5f2f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sub_sub_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "productId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sub_sub_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_ebc48c6a0bfb5c908ab996c5f2f" PRIMARY KEY ("product")`);
    }
}
exports.table1675567374419 = table1675567374419;
