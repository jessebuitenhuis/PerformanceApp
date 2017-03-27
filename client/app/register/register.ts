import {Component} from "@angular/core";
import {User, UserResource} from "../resources/user.resource";
import {ResourceModel} from "ng2-resource-rest";

@Component({
    templateUrl: 'app/register/register.component.html'
})
export class RegisterComponent {
    user : User;

    constructor(private _userResource : UserResource) {
        this.user = <User>this._userResource.createModel();
    }
}