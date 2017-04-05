import {Model, Schema} from "mongoose";
import {IGoalModel, Goal} from "./Goal";

export interface IPersonalGoalModel extends IGoalModel {}

export let personalGoalSchema : Schema = new Schema({
    team: String
});

export let PersonalGoal : IPersonalGoalModel = <IPersonalGoalModel>Goal.discriminator('PersonalGoal', personalGoalSchema);