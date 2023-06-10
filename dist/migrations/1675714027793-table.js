"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675714027793 = void 0;
class table1675714027793 {
    name = 'table1675714027793';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "star" integer NOT NULL, "increment" integer NOT NULL, "average" numeric, "productsProductId" uuid, CONSTRAINT "REL_41d93136a6b4d2517f3e4f3871" UNIQUE ("productsProductId"), CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_41d93136a6b4d2517f3e4f38710" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_41d93136a6b4d2517f3e4f38710"`);
        await queryRunner.query(`DROP TABLE "evaluation"`);
    }
}
exports.table1675714027793 = table1675714027793;
