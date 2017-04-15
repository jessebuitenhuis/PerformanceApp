import {ref, schemaDef, getSchema, IMongooseModel} from "mongoose-decorators-ts"
import {Goal, goalSchema} from "./Goal"

@schemaDef({})
export class teamGoalSchema {
    @ref('Team')
    team: string
}

export const TeamGoal = Goal.discriminator("TeamGoal", getSchema(teamGoalSchema)) as IMongooseModel<Goal, teamGoalSchema & goalSchema>;