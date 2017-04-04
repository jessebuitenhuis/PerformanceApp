import {Model, Schema} from "mongoose";
import {IGoalModel, Goal} from "./Goal";

export interface ITeamGoal extends IGoalModel {}

export let teamGoalSchema : Schema = new Schema({
    team: String
});

export let PersonalGoal : Model<ITeamGoal> = Goal.discriminator('PersonalGoal', teamGoalSchema) as Model<ITeamGoal>;