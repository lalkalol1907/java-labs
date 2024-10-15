"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const mongo_1 = require("./mongo");
const ContactsRepository_1 = require("./repository/ContactsRepository");
const ContactsHandler_1 = require("./httpServer/handlers/ContactsHandler");
const httpServer_1 = require("./httpServer");
class Application {
    constructor() {
        this._closable = [];
        this._initable = [];
        this._runnable = [];
        const config = new config_1.Config();
        const mongoClient = new mongo_1.MongoClient(config);
        const contactsRepository = new ContactsRepository_1.ContactsRepository(mongoClient);
        const contactsHandler = new ContactsHandler_1.ContactsHandler(contactsRepository);
        const httpServer = new httpServer_1.HTTPServer(config, contactsHandler);
        this._closable.push(mongoClient, httpServer);
        this._initable.push(mongoClient);
        this._runnable.push(httpServer);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const service of this._closable) {
                yield service.close();
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const service of this._initable) {
                yield service.init();
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const service of this._runnable) {
                promises.push(service.run());
            }
            yield Promise.all(promises);
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new Application();
        try {
            yield app.init();
            yield app.run();
        }
        finally {
            yield app.close();
        }
    });
}
main();
