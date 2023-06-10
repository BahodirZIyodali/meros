"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675556318739 = void 0;
class table1675556318739 {
    name = 'table1675556318739';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "aksiya" character varying(64) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "aksiya"`);
    }
}
exports.table1675556318739 = table1675556318739;
