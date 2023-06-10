"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675726535137 = void 0;
class table1675726535137 {
    name = 'table1675726535137';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" bigint`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" character varying(64) NOT NULL`);
    }
}
exports.table1675726535137 = table1675726535137;
