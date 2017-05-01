import {
    IMongooseDocument, IMongooseModel, ModelFromSchemaDef, ref, refArray, required,
    schemaDef
} from "mongoose-decorators-ts"
import {connection, ModelFindByIdAndUpdateOptions, Types} from "mongoose"
import {User} from "./User"

let options = {
    toJSON: {
        virtuals: true
    }
}

@schemaDef({
    name: 'Team',
    schema_options: options
})
export class teamSchema {
    @required()
    name: string

    @refArray('User', Types.ObjectId)
    users: string[]

    static findUsersById(this: typeof Team, id: string, next: (err: any, users?: User[]) => void): void {
        this.findById(id)
            .populate('users')
            .exec(function (err, team) {
                if (err) return next(err)
                if (!team) return next(new Error("Team not found"))

                return team.users
            })
    }


    static addUser(this: typeof Team, id: string, userId: string, options?: ModelFindByIdAndUpdateOptions): Promise<User> {
        let user: User;


        return User.findById(userId, options)
            .then(result => {
                user = result;
                return this.findById(id) })
            .then((team: Team) => {
                if (team.users.indexOf(user._id) === -1) team.users.push(user._id)
                return team.save()
            })
            .then(() => { return user })
    }

    static removeUser(this: typeof Team, id: string, userId: string) : Promise<void> {
        return this.findById(id)
            .then(team => {
                var index = team.users.indexOf(userId)
                if (index === -1) throw new Error('User not found')
                team.users.splice(index, 1)
                return team.save()
            })
            .then(() => { return null})
    }
}

export const Team = ModelFromSchemaDef<typeof teamSchema, teamSchema>(teamSchema, connection)
export type Team = IMongooseDocument<teamSchema>