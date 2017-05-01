import {IGoal} from "../interfaces/IGoal"
import {connection, Types} from "mongoose"
import {
    field, required, schemaDef, ModelFromSchemaDef, IMongooseDocument, ref, IMongooseModel
} from "mongoose-decorators-ts"

@schemaDef({name: 'Goal'})
export class goalSchema {
    @required()
    name: string

    @field()
    startDate: Date

    @field()
    endDate: Date

    @ref('Goal')
    parentGoal: string;

    createAsChild(this: typeof Goal, parentId: string, goal: IGoal, cb: (err?: any, goal?: IGoal) => void) {
        goal.parentGoal = parentId;
        this.create(goal, cb);
    }

    updateAsChild(this: typeof Goal, params: {parentId: string, childId: string}, goal: IGoal, cb: (err?: any, goal?: IGoal) => void) {
        let _this = this;

        this.findById(goal._id, function (err: any, childGoal: IGoal) {
            if (err) return cb(err);
            if (goal) {
                if (goal.parentGoal !== params.parentId) return cb(new Error("Milestone not found in goal."))

                _this.findByIdAndUpdate(childGoal._id, goal, cb);
            }
            _this.create(goal, cb);
        })
    }
}

export const Goal = ModelFromSchemaDef<typeof goalSchema, goalSchema>(goalSchema, connection) as IMongooseModel<IMongooseDocument<goalSchema>, goalSchema>
export type Goal = IMongooseDocument<goalSchema>