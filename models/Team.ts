import {ITeam} from "../interfaces/ITeam";
import {Document, Model, model, Schema} from "mongoose";

export interface ITeamModel extends ITeam, Document {};

export let teamSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export let Goal : Model<ITeamModel> = model<ITeamModel>("Goal", teamSchema);