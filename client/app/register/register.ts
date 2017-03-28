import {Component} from "@angular/core";
import {User, UserResource} from "../resources/user.resource";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'app/register/register.component.html'
})
export class RegisterComponent {
    user : User;
    errorMessage: string;

    constructor(private _userResource : UserResource, private _router : Router) {
        this.user = <User>this._userResource.createModel();
    }

    save(user: User) : void {
        user.$save().$observable
            .subscribe(() => this._router.navigate(['users']), (e) => this.errorMessage = e._body);
    }
}