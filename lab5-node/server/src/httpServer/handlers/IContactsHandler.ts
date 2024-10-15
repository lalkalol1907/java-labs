import {Request, Response, NextFunction} from "express";

export interface IContactsHandler {
    getAllContacts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getContactById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createContact(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteContactById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateContact(req: Request, res: Response, next: NextFunction): Promise<void>;
}