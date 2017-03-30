import { NgModule } from '@angular/core';
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

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ResourceModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        UsersComponent,
        SiteHeaderComponent,
        RegisterComponent,
        LoginComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { };