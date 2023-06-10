"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675777948607 = void 0;
class table1675777948607 {
    name = 'table1675777948607';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "orders" ("OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "count" integer DEFAULT '0', "costumerUserId" uuid, "productsProductId" uuid, CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sold_count" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD "ordersOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_ea9071e2e12ea92826cb020cd10" FOREIGN KEY ("costumerUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_aaccc14bf116056db7a1c205cd4" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3e693f1b89669fc379f33fc0bf7" FOREIGN KEY ("ordersOrderId") REFERENCES "orders"("OrderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3e693f1b89669fc379f33fc0bf7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_aaccc14bf116056db7a1c205cd4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_ea9071e2e12ea92826cb020cd10"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "ordersOrderId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sold_count"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }
}
exports.table1675777948607 = table1675777948607;
