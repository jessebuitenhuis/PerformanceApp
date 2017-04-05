import {ITeam} from "../interfaces/ITeam";
import {Document, Model, model, Schema} from "mongoose";

export interface ITeamModel extends ITeam, Model<Document> {};

export let teamSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export let TeamGoal : ITeamModel = <ITeamModel>model("Goal", teamSchema);