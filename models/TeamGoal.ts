import {Model, Schema} from "mongoose";
import {IGoalModel, Goal} from "./Goal";

export interface ITeamGoalModel extends IGoalModel {}

export let teamGoalSchema : Schema = new Schema({
    team: String
});

export let TeamGoal : ITeamGoalModel = <ITeamGoalModel>Goal.discriminator('TeamGoal', teamGoalSchema);