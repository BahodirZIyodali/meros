"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675430163593 = void 0;
class table1675430163593 {
    name = 'table1675430163593';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_number" character varying(64) NOT NULL, "password" character varying(125) NOT NULL, "user_mail" character varying(125) NOT NULL, "user_name" character varying(64) NOT NULL, "user_surname" character varying(64) NOT NULL, "user_was_born" integer NOT NULL, "user_s" character varying(15) NOT NULL, "user_img" character varying(200) NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.table1675430163593 = table1675430163593;


