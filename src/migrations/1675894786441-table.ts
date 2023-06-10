import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675894786441 implements MigrationInterface {
    name = 'table1675894786441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "count" integer DEFAULT '0', "costumerUserId" uuid, "productsProductId" uuid, CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_number" character varying(64) NOT NULL, "password" character varying(125) NOT NULL, "user_mail" character varying(125) NOT NULL, "user_name" character varying(64) NOT NULL, "user_surname" character varying(64), "user_was_born" integer, "user_s" character varying(15), "user_img" character varying(200), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "commentary" character varying(600) NOT NULL, "productsProductId" uuid, "usersUserId" uuid, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "star" integer NOT NULL, "increment" integer NOT NULL, "average" numeric, "productsProductId" uuid, CONSTRAINT "REL_41d93136a6b4d2517f3e4f3871" UNIQUE ("productsProductId"), CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "price" character varying(64) NOT NULL, "discont_price" character varying(64), "sold_count" integer, "brand" character varying(64) NOT NULL, "size" character varying(64) NOT NULL, "netto" character varying(64) NOT NULL, "author" character varying(128) NOT NULL, "description" character varying(128) NOT NULL, "color" character varying(64) NOT NULL, "made_in" character varying(64) NOT NULL, "discount" double precision, "time" TIMESTAMP NOT NULL DEFAULT now(), "img" character varying NOT NULL, "img1" character varying, "img2" character varying, "img3" character varying, "img4" character varying, "subSubCategoriesSubSubId" uuid, "ordersOrderId" uuid, CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TABLE "sub_sub_categories" ("sub_sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, "subCategoriesSubId" uuid, CONSTRAINT "PK_edec79a012217fc1e0514ce0b2c" PRIMARY KEY ("sub_sub_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, "categoriesCategoryId" uuid, CONSTRAINT "PK_32b9ffa93cf0c96b67bb8bb64e9" PRIMARY KEY ("sub_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_ea9071e2e12ea92826cb020cd10" FOREIGN KEY ("costumerUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_aaccc14bf116056db7a1c205cd4" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_654775445936f86be3dd390bbf7" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_64dc9425b621e02dcb43d986bce" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_41d93136a6b4d2517f3e4f38710" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_32a90be1a237744780729a3228f" FOREIGN KEY ("subSubCategoriesSubSubId") REFERENCES "sub_sub_categories"("sub_sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3e693f1b89669fc379f33fc0bf7" FOREIGN KEY ("ordersOrderId") REFERENCES "orders"("OrderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" ADD CONSTRAINT "FK_33e79d2ab7936893d6e843b58e6" FOREIGN KEY ("subCategoriesSubId") REFERENCES "sub_categories"("sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_681bbcf99c71262608ccb61038b" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_681bbcf99c71262608ccb61038b"`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" DROP CONSTRAINT "FK_33e79d2ab7936893d6e843b58e6"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3e693f1b89669fc379f33fc0bf7"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_32a90be1a237744780729a3228f"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_41d93136a6b4d2517f3e4f38710"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_64dc9425b621e02dcb43d986bce"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_654775445936f86be3dd390bbf7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_aaccc14bf116056db7a1c205cd4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_ea9071e2e12ea92826cb020cd10"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`DROP TABLE "sub_sub_categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "evaluation"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
