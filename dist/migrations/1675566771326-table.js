"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675566771326 = void 0;
class table1675566771326 {
    name = 'table1675566771326';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "aksiya"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "comment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discount" double precision`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rate" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "aksiya" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "comments" character varying NOT NULL`);
    }
}
exports.table1675566771326 = table1675566771326;
