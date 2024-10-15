"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor() {
        var _a, _b;
        this.mongo = {
            username: process.env.MONGO_USERNAME || 'user',
            password: process.env.MONGO_PASSWORD || 'password',
            database: process.env.MONGO_DATABASE || 'admin',
            host: process.env.MONGO_HOST || 'localhost',
            port: Number((_a = process.env.MONGO_PORT) !== null && _a !== void 0 ? _a : '27017'),
        };
        this.httpServer = {
            port: Number((_b = process.env.HTTP_PORT) !== null && _b !== void 0 ? _b : '3011'),
        };
    }
}
exports.Config = Config;
