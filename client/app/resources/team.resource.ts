import {ITeam} from "../../../interfaces/ITeam"
import {BaseResource, BaseResourceModel} from "./index.resource"
import {Injectable} from "@angular/core"
import {
    ResourceAction, ResourceCRUD, ResourceMethod, ResourceMethodStrict, ResourceModel,
    ResourceParams
} from "ng2-resource-rest"
import {RequestMethod} from "@angular/http"
import {IUser} from "../../../interfaces/IUser"
import {User} from "./user.resource"

type teamUserInput = {id: any, userId: any}

export interface Team extends ITeam {}
export class Team extends BaseResourceModel<ITeam & TeamResource> {
    $addUser(id: string) {
        return this.$resource.addUser({id: this._id, userId: id}, () => this.$get())
    }

    $removeUser(user: User) {
        return this.$resource.removeUser({id: this._id, userId: user.id}, () => this.$get())
    }
}

@Injectable()
@ResourceParams({
    url: 'api/teams'
})
export class TeamResource extends BaseResource<Team, Team, Team> {
    initResultObject() : Team {
        return new Team();
    }

    @ResourceAction({
        path: '/{id}/users/{userId}',
        isArray: true
    })
    queryUsers: ResourceMethod<teamUserInput, IUser[]>

    @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}/users/{userId}'
    })
    addUser: ResourceMethod<teamUserInput, IUser>

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}/users/{userId}'
    })
    removeUser: ResourceMethod<teamUserInput, any>
}