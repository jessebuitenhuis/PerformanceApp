import {IMongooseDocument, ModelFromSchemaDef, required, schemaDef} from "mongoose-decorators-ts"
import {connection} from "mongoose"

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
}

export const Team = ModelFromSchemaDef<typeof teamSchema, teamSchema>(teamSchema, connection)
export type Team = IMongooseDocument<teamSchema>;