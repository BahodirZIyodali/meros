"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675605197286 = void 0;
class table1675605197286 {
    name = 'table1675605197286';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comments" ("comment" uuid NOT NULL DEFAULT uuid_generate_v4(), "commentary" character varying(600) NOT NULL, "productsProductId" uuid, "usersUserId" uuid, CONSTRAINT "PK_383831ec251116101b48eda6151" PRIMARY KEY ("comment"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_654775445936f86be3dd390bbf7" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_64dc9425b621e02dcb43d986bce" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_64dc9425b621e02dcb43d986bce"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_654775445936f86be3dd390bbf7"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
exports.table1675605197286 = table1675605197286;
