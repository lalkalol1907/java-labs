import * as mongoDB from 'mongodb';

export interface IMongoClient {
    getClient(): mongoDB.MongoClient;
    getDB(): mongoDB.Db
}