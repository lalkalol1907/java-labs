import {IContactsRepository} from "./IContactsRepository";
import {IMongoClient} from "../mongo/IMongoClient";
import * as mongoDB from 'mongodb'
import {Contact} from "../models/Contact";

export class ContactsRepository implements IContactsRepository {
    private readonly _collection: mongoDB.Collection<Contact>
    constructor(private readonly _mongoClient: IMongoClient) {
        this._collection = _mongoClient.getDB().collection("contacts");
    }

    getAllContacts(): Promise<Required<Contact>[]> {
        return this._collection.find().toArray()
    }

    getContactById(id: string): Promise<Required<Contact> | null> {
        const _id = new mongoDB.ObjectId(id)
        return this._collection.findOne({_id})
    }

    async createContact(contact: Contact): Promise<Required<Contact>> {
        console.log(contact)
        const res = await this._collection.insertOne(contact);
        return {
            _id: res.insertedId,
            ...contact,
        };
    }

    async updateContact(id: string, contact: Partial<Contact>): Promise<void> {
        const _id = new mongoDB.ObjectId(id)
        await this._collection.updateOne({_id}, contact);
    }

    async deleteContactById(id: string): Promise<void> {
        const _id = new mongoDB.ObjectId(id)
        await this._collection.deleteOne({_id})
    }
}