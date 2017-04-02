import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {SiteHeaderComponent} from "./site-header/siteHeader.component";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./register/register";
import {appRoutes} from "./routes";
import {FormsModule} from "@angular/forms";
import {ResourceModule} from "ng2-resource-rest";
import {LoginComponent} from "./login/login.component";
import {RequestOptions, Headers, BaseRequestOptions} from "@angular/http";
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/authguard";
import {AuthService} from "./auth/auth.service";

export class AppRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Accept': 'application/json'
    })
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ResourceModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        AuthModule
    ],
    declarations: [
        AppComponent,
        UsersComponent,
        SiteHeaderComponent,
        RegisterComponent,
        LoginComponent
    ],
    providers: [
        { provide: RequestOptions, useClass: AppRequestOptions },
        AuthGuard,
        AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { };