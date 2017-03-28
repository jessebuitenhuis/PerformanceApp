import {Document, MongooseDocumentOptionals} from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    name?: string;
}