import {IConfig} from "./IConfig";
import {IMongoConfig} from "./IMongoConfig";
import {IHttpServerConfig} from "./IHttpServerConfig";
import {Initable} from "../types/Initable";

export class Config implements IConfig {
    mongo: IMongoConfig;
    httpServer: IHttpServerConfig;

    constructor() {
        this.mongo = {
            username: process.env.MONGO_USERNAME || 'user',
            password: process.env.MONGO_PASSWORD || 'password',
            database: process.env.MONGO_DATABASE || 'admin',
            host: process.env.MONGO_HOST || 'localhost',
            port: Number(process.env.MONGO_PORT ?? '27017'),
        }

        this.httpServer = {
            port: Number(process.env.HTTP_PORT ?? '3011'),
        }
    }
}