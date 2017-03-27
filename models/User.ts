import { Document, Schema, Model, model } from 'mongoose';
import {IUser} from "../interfaces/IUser";

export interface IUserModel extends IUser, Document {};

export var userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.virtual('name').get(function(){
    return [this.firstName, this.lastName].join(' ');
});

userSchema.virtual('id').get(function(){
    return this._id;
});

userSchema.set('toJSON', { virtuals: true });

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);