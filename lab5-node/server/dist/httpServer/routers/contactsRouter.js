"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const contactsRouter = (handler) => (app) => {
    router.get("/", handler.getAllContacts.bind(handler));
    router.post("/", handler.createContact.bind(handler));
    router.get("/:id", handler.getContactById.bind(handler));
    router.put("/:id", handler.updateContact.bind(handler));
    router.delete("/:id", handler.deleteContactById.bind(handler));
    app.use("/v1/contact", router);
};
exports.contactsRouter = contactsRouter;
