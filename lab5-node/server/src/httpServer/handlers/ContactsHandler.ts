import {IContactsHandler} from "./IContactsHandler";
import {IContactsRepository} from "../../repository/IContactsRepository";
import {Request, Response, NextFunction} from "express";

export class ContactsHandler implements IContactsHandler {
    constructor(private readonly _contactsRepository: IContactsRepository) {
    }

    async getAllContacts(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._contactsRepository.getAllContacts()
            res.json({
                message: "OK",
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }

    async getContactById(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.params)
            const result = await this._contactsRepository.getContactById(req.params.id)
            res.json({
                message: "OK",
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }

    async createContact(req: Request, res: Response, next: NextFunction) {
        try {
            const {_id: id} = await this._contactsRepository.createContact(req.body)
            res.json({
                message: "OK",
                data: {id}
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteContactById(req: Request, res: Response, next: NextFunction) {
        try {
            await this._contactsRepository.deleteContactById(req.params.id)
            res.json({
                message: "OK",
            })
        } catch (error) {
            next(error)
        }
    }

    async updateContact(req: Request, res: Response, next: NextFunction) {
        try {
            await this._contactsRepository.updateContact(req.params.id, req.body)
            res.json({
                message: "OK",
            })
        } catch (error) {
            next(error)
        }
    }
}