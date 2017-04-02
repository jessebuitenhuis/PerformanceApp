import {Injectable} from "@angular/core";
import {tokenName} from "./auth.module";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
    constructor(private _router: Router) {}

    loggedIn() : boolean {
        let token = localStorage.getItem(tokenName);
        return !!token;
    }

    logOut() : void {
        localStorage.removeItem(tokenName);
        this._router.navigate(['/login']);
    }
}