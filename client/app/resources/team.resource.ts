import {ITeam} from "../../../interfaces/ITeam"
import {BaseResource, BaseResourceModel} from "./index.resource"
import {Injectable} from "@angular/core"
import {
    ResourceAction, ResourceCRUD, ResourceMethod, ResourceMethodStrict, ResourceModel,
    ResourceParams
} from "ng2-resource-rest"
import {RequestMethod} from "@angular/http"
import {IUser} from "../../../interfaces/IUser"

type teamUserInput = {id: any, userId: any}

interface TeamUser extends IUser {}
class TeamUser {

    constructor(data: IUser, private _team: Team) {
        Object.assign(this, data)
    }

    $removeFromTeam() {
        return this._team.$resource.removeUser({id: this._team._id, userId: this.id}, () => this._team.$get())
    }
}

export interface Team extends ITeam {}
export class Team extends BaseResourceModel<ITeam & TeamResource> {
    $setData(data: any) {
        data.users = data.users.map((user: IUser) => { return new TeamUser(user, this); } )
        return super.$setData(data)
    }
    /**
     * Does a new GET request and updates current model data
     */
    $get() {
        this.$resource.get({id: this._id}, result => this.$setData(result))
    }

    $addUser(id: string) {
        return this.$resource.addUser({id: this._id, userId: id}, () => this.$get())
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