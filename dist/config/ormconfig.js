"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourse = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dataSourse = new typeorm_1.DataSource({
    type: "postgres",
    host: String(process.env.host),
    port: 5432,
    database: String(process.env.database),
    username: String(process.env.database),
    password: String(process.env.password),
    entities: [path_1.default.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
    migrations: [path_1.default.resolve(__dirname, "..", "migrations", "**/*.ts")],
    logging: true,
    synchronize: false,
});
