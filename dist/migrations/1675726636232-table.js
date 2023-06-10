"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675726636232 = void 0;
class table1675726636232 {
    name = 'table1675726636232';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" bigint`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(64) NOT NULL`);
    }
}
exports.table1675726636232 = table1675726636232;
