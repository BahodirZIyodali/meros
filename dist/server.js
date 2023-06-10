"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("./config/ormconfig");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = __importDefault(require("./modules/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_json_1 = __importDefault(require("./docs.json"));
const app = (0, express_1.default)();
const main = async () => {
    try {
        await ormconfig_1.dataSourse.initialize();
        // app.use()
        app.use(express_1.default.json());
        app.use(routes_1.default);
        app.use(errorHandler_1.default);
        app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_json_1.default));
        app.all("/*", (_, res) => res.sendStatus(404));
    }
    catch (error) {
        console.log(error);
    }
    finally {
        app.listen(9000, () => console.log(9000));
    }
};
main();
