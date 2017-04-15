import {field, getSchema, IMongooseDocument, ModelFromSchemaDef, pre, required, schemaDef} from "mongoose-decorators-ts"
import {genSalt, hash, compare} from 'bcryptjs'
import {IUser} from "../interfaces/IUser"
import * as mongoose from "mongoose"

let options = {
    toJSON: {
        virtuals: true,
        transform: function (doc: User, ret: IUser): IUser {
            delete ret.password
            return ret
        }
    }
}

@schemaDef({
    name: 'User',
    schema_options: options
})
export class userSchema implements IUser {
    @required()
    firstName: string

    @required()
    lastName: string

    @required()
    email: string

    @required()
    password: string

    get name(): string {
        return [this.firstName, this.lastName].join(' ')
    }

    //Todo: fix the any type on this. Problem is the isModified
    @pre('save')
    encryptPassword(this: User, next: (err?: any) => void) {
        var user = this

        if (!this.isModified('password')) return next()

        genSalt(10, function (err, salt) {
            if (err) return next(err)

            hash(user.password, salt, function (err, hash) {
                if (err) return next(err)

                user.password = hash
                next()
            })
        })
    }

    validatePassword(password: string, next: (err: any, isMatch?: boolean) => void) {
        compare(password, this.password, function (err, isMatch) {
            if (err) return next(err)
            next(null, isMatch)
        })
    }

}

export const User = ModelFromSchemaDef<typeof userSchema, userSchema>(userSchema, mongoose.connection)
export type User = IMongooseDocument<userSchema>;