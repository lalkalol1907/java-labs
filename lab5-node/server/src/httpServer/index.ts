import express, {Express, NextFunction, Request, Response} from "express";
import {Server} from "http"
import {ContactsHandler} from "./handlers/ContactsHandler";
import {RouterFunc} from "../types/RouterFunc";
import {contactsRouter} from "./routers/contactsRouter";
import {IConfig} from "../config/IConfig";
import {Closable} from "../types/Closable";
import {Runnable} from "../types/Runnable";
import {HTTPError} from "../types/HTTPError";
import cors from "cors";

export class HTTPServer implements Closable, Runnable {
    private readonly _app: Express;
    private _server: Server | undefined

    private readonly _routers: RouterFunc[]

    constructor(
        private readonly _config: IConfig,
        private readonly _contactsHandler: ContactsHandler
    ) {
        this._app = express()

        this._routers = [
            contactsRouter(this._contactsHandler)
        ];
    }

    private _handleError(
        err: HTTPError | Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const status = err instanceof HTTPError ? err.status : 500;
        console.error(err)
        res.status(status).json({
            message: err.message,
        })
    }

     run() {
        this._app.use(express.json());
        this._app.use(cors());

        for (const router of this._routers) {
            router(this._app);
        }
        this._app.use(this._handleError.bind(this));


        this._server = this._app.listen(this._config.httpServer.port);
        return new Promise<void>((resolve, reject) => {
            this._server?.on('error', reject)
            this._server?.on('close', resolve)
        })
    }

    close() {
        this._server?.close();
    }
}