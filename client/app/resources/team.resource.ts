import {ITeam} from "../../../interfaces/ITeam"
import {BaseResource, BaseResourceModel} from "./index.resource"
import {Injectable} from "@angular/core"
import {ResourceAction, ResourceMethod, ResourceParams} from "ng2-resource-rest"
import {RequestMethod} from "@angular/http"
import {IUser} from "../../../interfaces/IUser"

type teamUserInput = {id: any, userId: any}

export interface Team extends ITeam {}
export class Team extends BaseResourceModel<ITeam> {}

@Injectable()
@ResourceParams({
    url: 'api/teams'
})
export class TeamResource extends BaseResource<Team, Team, Team> {
    @ResourceAction({
        path: '/{id}/users/{userId}'
    })
    queryUsers: ResourceMethod<teamUserInput, IUser[]>

    @ResourceAction({
        method: RequestMethod.Post,
        path: '/{!id}/users/{userId}'
    })
    addUser: ResourceMethod<teamUserInput, IUser>

    @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}/users/{!userId}'
    })
    updateUser: ResourceMethod<teamUserInput, IUser>

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}/users/{userId}'
    })
    removeUser: ResourceMethod<teamUserInput, any>
}