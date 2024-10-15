import {IMongoClient} from "./IMongoClient";
import * as mongoDB from "mongodb";
import {IConfig} from "../config/IConfig";
import {Closable} from "../types/Closable";
import {Initable} from "../types/Initable";

export class MongoClient implements IMongoClient, Closable, Initable {
    private readonly _client: mongoDB.MongoClient;

    constructor(private readonly _config: IConfig) {
        this._client = new mongoDB.MongoClient(
            `mongodb://${_config.mongo.username}:${_config.mongo.password}@${_config.mongo.host}:${_config.mongo.port}/${_config.mongo.database}`
        )
    }

    async init() {
        await this._client.connect();
    }

    async close() {
        await this._client.close()
    }

    getClient() {
        return this._client;
    }

    getDB() {
        return this._client.db();
    }
}