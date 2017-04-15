import {ref, schemaDef, getSchema, IMongooseModel} from "mongoose-decorators-ts"
import {Goal, goalSchema} from "./Goal"

@schemaDef({})
export class milestoneSchema {
    @ref('Goal')
    parentGoal: string
}

export const Milestone = Goal.discriminator("Milestone", getSchema(milestoneSchema)) as IMongooseModel<Goal, milestoneSchema & goalSchema>;