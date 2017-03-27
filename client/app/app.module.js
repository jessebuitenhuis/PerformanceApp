System.register(["@angular/core", "@angular/platform-browser", "./app.component", "./users/users.component", "./site-header/siteHeader.component", "@angular/router", "./register/register", "./routes", "@angular/forms", "ng2-resource-rest"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, app_component_1, users_component_1, siteHeader_component_1, router_1, register_1, routes_1, forms_1, ng2_resource_rest_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (users_component_1_1) {
                users_component_1 = users_component_1_1;
            },
            function (siteHeader_component_1_1) {
                siteHeader_component_1 = siteHeader_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (register_1_1) {
                register_1 = register_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (ng2_resource_rest_1_1) {
                ng2_resource_rest_1 = ng2_resource_rest_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        ng2_resource_rest_1.ResourceModule.forRoot(),
                        router_1.RouterModule.forRoot(routes_1.appRoutes)
                    ],
                    declarations: [
                        app_component_1.AppComponent,
                        users_component_1.UsersComponent,
                        siteHeader_component_1.SiteHeaderComponent,
                        register_1.RegisterComponent
                    ],
                    bootstrap: [app_component_1.AppComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
            ;
        }
    };
});
