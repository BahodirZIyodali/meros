"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675727305358 = void 0;
class table1675727305358 {
    name = 'table1675727305358';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discont_price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discont_price" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discont_price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discont_price" bigint`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(64) NOT NULL`);
    }
}
exports.table1675727305358 = table1675727305358;
