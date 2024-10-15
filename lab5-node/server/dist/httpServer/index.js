"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPServer = void 0;
const express_1 = __importDefault(require("express"));
const contactsRouter_1 = require("./routers/contactsRouter");
const HTTPError_1 = require("../types/HTTPError");
const cors_1 = __importDefault(require("cors"));
class HTTPServer {
    constructor(_config, _contactsHandler) {
        this._config = _config;
        this._contactsHandler = _contactsHandler;
        this._app = (0, express_1.default)();
        this._routers = [
            (0, contactsRouter_1.contactsRouter)(this._contactsHandler)
        ];
    }
    _handleError(err, req, res, next) {
        const status = err instanceof HTTPError_1.HTTPError ? err.status : 500;
        console.error(err);
        res.status(status).json({
            message: err.message,
        });
    }
    run() {
        this._app.use(express_1.default.json());
        this._app.use((0, cors_1.default)());
        for (const router of this._routers) {
            router(this._app);
        }
        this._app.use(this._handleError.bind(this));
        this._server = this._app.listen(this._config.httpServer.port);
        return new Promise((resolve, reject) => {
            var _a, _b;
            (_a = this._server) === null || _a === void 0 ? void 0 : _a.on('error', reject);
            (_b = this._server) === null || _b === void 0 ? void 0 : _b.on('close', resolve);
        });
    }
    close() {
        var _a;
        (_a = this._server) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.HTTPServer = HTTPServer;
