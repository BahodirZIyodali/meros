"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675610528692 = void 0;
class table1675610528692 {
    name = 'table1675610528692';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "comment" TO "comment_id"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME CONSTRAINT "PK_383831ec251116101b48eda6151" TO "PK_eb0d76f2ca45d66a7de04c7c72b"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" RENAME CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" TO "PK_383831ec251116101b48eda6151"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "comment_id" TO "comment"`);
    }
}
exports.table1675610528692 = table1675610528692;
