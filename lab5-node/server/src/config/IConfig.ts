import {IMongoConfig} from "./IMongoConfig";
import {IHttpServerConfig} from "./IHttpServerConfig";

export interface IConfig {
    mongo: IMongoConfig;
    httpServer: IHttpServerConfig;
}