"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675725429401 = void 0;
class table1675725429401 {
    name = 'table1675725429401';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "rate" TO "discont_price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discont_price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discont_price" bigint`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discont_price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discont_price" integer`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "discont_price" TO "rate"`);
    }
}
exports.table1675725429401 = table1675725429401;
