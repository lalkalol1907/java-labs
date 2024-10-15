import {Express, Router} from "express";
import {IContactsHandler} from "../handlers/IContactsHandler";
import {RouterFunc, RouterFuncFactory} from "../../types/RouterFunc";

const router = Router();

export const contactsRouter: RouterFuncFactory<IContactsHandler> = (handler: IContactsHandler) => (app: Express) => {
    router.get("/", handler.getAllContacts.bind(handler));
    router.post("/", handler.createContact.bind(handler));

    router.get("/:id", handler.getContactById.bind(handler));
    router.put("/:id", handler.updateContact.bind(handler));
    router.delete("/:id", handler.deleteContactById.bind(handler));

    app.use("/v1/contact", router)
};