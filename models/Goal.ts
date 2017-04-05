import {IGoal} from "../interfaces/IGoal";
import {Document, Model, model, Schema, Types} from "mongoose";

export interface IGoalModel extends IGoal, Model<Document> {
    createAsChild(parentId: string, goal: IGoalModel, cb: (err?: any, doc?: IGoal) => void) : void;
    updateAsChild(params: {parentId: string, childId: string}, goal: IGoalModel, cb: (err?: any, doc?: IGoal) => void) : void;
};

export let goalSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: Date,
    endDate: Date,
    parentGoal: {type: Types.ObjectId, ref: 'Goal'}
});

goalSchema.statics.createAsChild = function(parentId: string, goal: IGoalModel, cb: (err?: any, goal?: IGoal) => void) {
    goal.parentGoal = parentId;
    (<IGoalModel>this).create(goal, cb);
};

goalSchema.statics.updateAsChild = function(params : {parentId: string, childId: string}, goal: IGoalModel, cb: (err?: any, goal?: IGoal) => void) {

    let _this = <IGoalModel>this;

    this.findOneById(goal._id, function (err: any, childGoal: IGoal) {
        if (err) return cb(err);
        if (goal) {
            if (goal.parentGoal !== params.parentId) return cb(new Error("Milestone not found in goal."))

            _this.findByIdAndUpdate(childGoal._id, goal, cb);
        }
        _this.create(goal, cb);
    })
};

export let Goal : IGoalModel = <IGoalModel>model("Goal", goalSchema);