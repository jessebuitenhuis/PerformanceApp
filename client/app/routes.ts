import {Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {RegisterComponent} from "./register/register";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/authguard";
import {TeamsComponent} from "./teams/teams.component"
import {TeamDetailComponent} from "./teams/teamDetail.component"
import {UserDetailComponent} from "./users/userDetail.component"


export const appRoutes: Routes = [
    {
        component: UsersComponent,
        path: 'users',
        canActivate: [AuthGuard]
    },
    {
        component: UserDetailComponent,
        path: 'users/:id',
        canActivate: [AuthGuard]
    },
    {
        component: TeamsComponent,
        path: 'teams',
        canActivate: [AuthGuard]
    },
    {
        component: TeamDetailComponent,
        path: 'teams/:id',
        canActivate: [AuthGuard]
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