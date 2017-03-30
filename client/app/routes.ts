import {Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {RegisterComponent} from "./register/register";
import {LoginComponent} from "./login/login.component";

export const appRoutes: Routes = [
    {
        component: UsersComponent,
        path: 'users'
    },
    {
        component: RegisterComponent,
        path: 'register'
    },
    {
        component: LoginComponent,
        path: 'login'
    }
];