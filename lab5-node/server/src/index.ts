import {Closable} from "./types/Closable";
import {Config} from "./config";
import {MongoClient} from "./mongo";
import {ContactsRepository} from "./repository/ContactsRepository";
import {Initable} from "./types/Initable";
import {Runnable} from "./types/Runnable";
import {ContactsHandler} from "./httpServer/handlers/ContactsHandler";
import {HTTPServer} from "./httpServer";

class Application {
    private readonly _closable: Closable[] = [];
    private readonly _initable: Initable[] = [];
    private readonly _runnable: Runnable[] = [];

    constructor() {
        const config = new Config();
        const mongoClient = new MongoClient(config);
        const contactsRepository = new ContactsRepository(mongoClient);
        const contactsHandler = new ContactsHandler(contactsRepository);

        const httpServer = new HTTPServer(config, contactsHandler);

        this._closable.push(mongoClient, httpServer);
        this._initable.push(mongoClient);
        this._runnable.push(httpServer);
    }

    async close() {
        for (const service of this._closable) {
            await service.close();
        }
    }

    async init() {
        for (const service of this._initable) {
            await service.init();
        }
    }

    async run() {
        const promises: Promise<any>[] = [];
        for (const service of this._runnable) {
            promises.push(service.run())
        }

        await Promise.all(promises);
    }
}

async function main() {
    const app = new Application();

    try {
        await app.init();
        await app.run();
    } finally {
        await app.close();
    }
}

main()