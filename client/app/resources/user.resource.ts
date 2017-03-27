import {Injectable} from "@angular/core";
import {IUser} from "../../../interfaces/IUser";
import {ResourceParams} from "ng2-resource-rest";
import {BaseResource, BaseResourceModel} from "./index.resource";

export interface User extends IUser {}

export class User extends BaseResourceModel<User> {}

@Injectable()
@ResourceParams({
    url: 'api/users'
})
export class UserResource extends BaseResource<User>{
}