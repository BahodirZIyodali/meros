"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675726699428 = void 0;
class table1675726699428 {
    name = 'table1675726699428';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(64) NOT NULL`);
    }
}
exports.table1675726699428 = table1675726699428;
