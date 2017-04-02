import {Component} from "@angular/core";
import {User, UserResource} from "../resources/user.resource";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'app/register/register.component.html'
})
export class RegisterComponent {
    user : User = <User>{};
    errorMessage: string;

    constructor(private _http : Http, private _router : Router) {}

    save(user: User) : void {
        this._http.post('api/signup', user)
            .subscribe(() => this._router.navigate(['users']), (e) => this.errorMessage = e._body);
    }
}