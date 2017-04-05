import {Model, Schema} from "mongoose";
import {IGoalModel, Goal} from "./Goal";

export interface IMilestoneModel extends IGoalModel {}

export let milestoneSchema : Schema = new Schema({
    team: String
});



export let Milestone : IMilestoneModel = <IMilestoneModel>Goal.discriminator('Milestone', milestoneSchema);