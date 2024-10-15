import {ObjectId} from "mongodb";

export interface Contact {
    _id?: ObjectId;
    username: string;
    email: string;
    telephone: {
        mobile: string;
        home: string;
    }
}