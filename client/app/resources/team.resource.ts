import {ITeam} from "../../../interfaces/ITeam"
import {BaseResource, BaseResourceModel} from "./index.resource"
import {Injectable} from "@angular/core"
import {ResourceParams} from "ng2-resource-rest"


export interface Team extends ITeam {}
export class Team extends BaseResourceModel<ITeam> {}

@Injectable()
@ResourceParams({
    url: 'api/teams'
})
export class TeamResource extends BaseResource<Team, Team, Team> {}