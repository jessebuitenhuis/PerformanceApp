import {Component} from "@angular/core";
import {IUserLogin} from "../../../interfaces/IUserLogin";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html'
})
export class LoginComponent {
    user: IUserLogin;
    errorMessage: string;

    constructor(private _http : Http, private _router: Router) {
        this.user = <IUserLogin>{};
    }

    login() : void {
        var _this = this;

        this._http.post('api/login', this.user)
            .subscribe(function (result){
                localStorage.setItem('token', result.headers.get('Authorization'));
                _this._router.navigate(['/users']);
            }, (e) => this.errorMessage = e.message);
    }


}