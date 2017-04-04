import {Model, Schema} from "mongoose";
import {IGoalModel, Goal} from "./Goal";

export interface IMilestone extends IGoalModel {}

export let milestoneSchema : Schema = new Schema({
    team: String
});

export let Milestone : Model<IMilestone> = Goal.discriminator('PersonalGoal', milestoneSchema) as Model<IMilestone>;