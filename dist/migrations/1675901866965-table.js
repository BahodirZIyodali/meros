"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675901866965 = void 0;
class table1675901866965 {
    name = 'table1675901866965';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "netto"`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "star" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "increment" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "average" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sold_count" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sold_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "author" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "discount" SET DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "discount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "author" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sold_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sold_count" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "average" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "increment" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "evaluation" ALTER COLUMN "star" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ADD "netto" character varying(64) NOT NULL`);
    }
}
exports.table1675901866965 = table1675901866965;
