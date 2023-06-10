"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675538436605 = void 0;
class table1675538436605 {
    name = 'table1675538436605';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, "categoriesCategoryId" uuid, CONSTRAINT "PK_32b9ffa93cf0c96b67bb8bb64e9" PRIMARY KEY ("sub_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_sub_categories" ("sub_sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, "subCategoriesSubId" uuid, CONSTRAINT "PK_edec79a012217fc1e0514ce0b2c" PRIMARY KEY ("sub_sub_id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("product" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_sub_id" character varying NOT NULL, "title" character varying(200) NOT NULL, "price" character varying(64) NOT NULL, "comments" character varying NOT NULL, "rate" integer NOT NULL, "brand" character varying(64) NOT NULL, "size" integer NOT NULL, "netto" character varying(64) NOT NULL, "author" character varying(128) NOT NULL, "description" character varying(128) NOT NULL, "color" character varying(64) NOT NULL, "made_in" character varying(64) NOT NULL, "img" character varying NOT NULL, "img1" character varying, "img2" character varying, "img3" character varying, "img4" character varying, "subSubCategoriesSubSubId" uuid, CONSTRAINT "PK_ebc48c6a0bfb5c908ab996c5f2f" PRIMARY KEY ("product"))`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_681bbcf99c71262608ccb61038b" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" ADD CONSTRAINT "FK_33e79d2ab7936893d6e843b58e6" FOREIGN KEY ("subCategoriesSubId") REFERENCES "sub_categories"("sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_32a90be1a237744780729a3228f" FOREIGN KEY ("subSubCategoriesSubSubId") REFERENCES "sub_sub_categories"("sub_sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_32a90be1a237744780729a3228f"`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" DROP CONSTRAINT "FK_33e79d2ab7936893d6e843b58e6"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_681bbcf99c71262608ccb61038b"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "sub_sub_categories"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.table1675538436605 = table1675538436605;
