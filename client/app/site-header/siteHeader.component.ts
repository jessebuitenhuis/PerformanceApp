import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'site-header',
    templateUrl: 'app/site-header/site-header.html',
    providers: [AuthService]
})
export class SiteHeaderComponent {
    auth: AuthService;

    constructor(private _auth: AuthService) {
        this.auth = _auth;
    }
}