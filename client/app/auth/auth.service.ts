import {Injectable} from "@angular/core";
import {tokenName} from "./auth.module";
import {Router} from "@angular/router";
import {IToken} from "../../../interfaces/IToken";
import {default as moment} from 'moment';
import {default as decode} from 'jwt-decode';
import {IUser} from "../../../interfaces/IUser";



@Injectable()
export class AuthService {
    private  _cachedToken : string;
    private _cachedDecodedToken : IToken;

    constructor(private _router: Router) {}

    getToken() : IToken {
        let token = localStorage.getItem(tokenName);
        if (!token) return null;

        if (token === this._cachedToken) return this._cachedDecodedToken;
        return this._cachedDecodedToken = decode(token);
    }

    tokenNotExpired() : boolean {
        let token : IToken = this.getToken();
        if (!token) return false;
        return token.exp >= moment().unix();
    }

    loggedIn() : boolean {
        return !!this.tokenNotExpired();
    }

    logOut() : void {
        localStorage.removeItem(tokenName);
        this._router.navigate(['/login']);
    }

    getUser() : IUser {
        let token = this.getToken();
        if (!token) return null;

        return token.user;
    }
}