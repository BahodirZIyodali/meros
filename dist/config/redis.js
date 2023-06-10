"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRedis = void 0;
const redis_1 = require("redis");
const exceptions_1 = require("../exceptions");
const fetchRedis = async () => {
    const client = (0, redis_1.createClient)({
        url: "redis://127.0.0.1:6379",
    });
    try {
        client.on("error", (err) => new exceptions_1.ErrorHandler("Error in Redis", 422));
        client.on("connect", () => console.log("Redis  Client Connected"));
        await client.connect();
        return client;
    }
    catch (error) {
        throw new exceptions_1.ErrorHandler("Error in Redis", 422);
    }
};
exports.fetchRedis = fetchRedis;
