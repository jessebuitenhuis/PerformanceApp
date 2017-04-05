import { Document, Schema, Model, model } from 'mongoose';
import {IUser} from "../interfaces/IUser";
import { genSalt, hash, compare } from 'bcryptjs';

export interface IUserModel extends IUser, Model<Document> {
    validatePassword(password: string, done: (err: any, isMatch?: boolean) => void) : boolean;
};

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

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    genSalt(10, function(err, salt){
        if (err) return next(err);

        hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.set('toJSON', { virtuals: true });

userSchema.method('validatePassword', function(password: string, next: any){
    compare(password, this.password, function(err, isMatch){
        if (err) return next(err);
        next(null, isMatch);
    });
});

export const User: IUserModel = <IUserModel>model("User", userSchema);