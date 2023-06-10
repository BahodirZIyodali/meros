"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675861454434 = void 0;
class table1675861454434 {
    name = 'table1675861454434';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "time" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "time"`);
    }
}
exports.table1675861454434 = table1675861454434;
