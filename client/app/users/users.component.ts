import {Component, OnInit} from '@angular/core';
import {User, UserResource} from "../resources/user.resource";

@Component({
    selector: 'users',
    templateUrl: 'app/users/users.html'
})
export class UsersComponent implements OnInit {
    users : User[];

    constructor(private _userResource: UserResource) {}

    ngOnInit() {
        var token = localStorage.getItem('token');
        this._userResource.setHeaders({'Authorization': token});
        this.users = this._userResource.query();

    }
}
