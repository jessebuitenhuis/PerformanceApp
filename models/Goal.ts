import {IGoal} from "../interfaces/IGoal";
import {Document, Model, model, Schema} from "mongoose";

export interface IGoalModel extends IGoal, Document {};

export let goalSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: Date,
    endDate: Date
});

export let Goal : Model<IGoalModel> = model<IGoalModel>("Goal", goalSchema);