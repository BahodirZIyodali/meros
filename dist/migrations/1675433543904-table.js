"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675433543904 = void 0;
class table1675433543904 {
    name = 'table1675433543904';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_surname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_was_born" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_s" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_img" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_img" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_s" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_was_born" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_surname" SET NOT NULL`);
    }
}
exports.table1675433543904 = table1675433543904;
