import {Injectable} from "@angular/core";
import {IUser} from "../../../interfaces/IUser";
import {ResourceAction, ResourceMethod, ResourceParams, ResourceResult} from "ng2-resource-rest"
import {BaseResource, BaseResourceModel} from "./index.resource";
import {Team, TeamResource} from "./team.resource"
import {ITeam} from "../../../interfaces/ITeam"

export interface User extends IUser {}

export class User extends BaseResourceModel<IUser & UserResource> {
    $queryTeams() {
        return this.$resource.queryTeams({id: this._id})

    }
}

@Injectable()
@ResourceParams({
    url: 'api/users'
})
export class UserResource extends BaseResource<User, User, User>{
    @ResourceAction({
        path: '/{!id}/teams',
        isArray: true
    })
    queryTeams: ResourceMethod<{id: number}, ITeam[]>

}
