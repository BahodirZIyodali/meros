"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675726907029 = void 0;
class table1675726907029 {
    name = 'table1675726907029';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(64) NOT NULL`);
    }
}
exports.table1675726907029 = table1675726907029;
