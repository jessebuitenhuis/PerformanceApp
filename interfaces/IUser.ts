import {Document, MongooseDocumentOptionals} from "mongoose";

export interface IUser {
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    name?: string;
}