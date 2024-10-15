import {Contact} from "../models/Contact";

export interface IContactsRepository {
    getAllContacts(): Promise<Required<Contact>[]>
    getContactById(id: string): Promise<Required<Contact> | null>
    createContact(contact: Contact): Promise<Required<Contact>>
    deleteContactById(id: string): Promise<void>
    updateContact(id: string, contact: Partial<Contact>): Promise<void>
}