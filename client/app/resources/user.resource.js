System.register(["@angular/core", "ng2-resource-rest", "./index.resource"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, ng2_resource_rest_1, index_resource_1, User, UserResource;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_resource_rest_1_1) {
                ng2_resource_rest_1 = ng2_resource_rest_1_1;
            },
            function (index_resource_1_1) {
                index_resource_1 = index_resource_1_1;
            }
        ],
        execute: function () {
            User = class User extends index_resource_1.BaseResourceModel {
            };
            exports_1("User", User);
            UserResource = class UserResource extends index_resource_1.BaseResource {
            };
            UserResource = __decorate([
                core_1.Injectable(),
                ng2_resource_rest_1.ResourceParams({
                    url: 'api/users'
                })
            ], UserResource);
            exports_1("UserResource", UserResource);
        }
    };
});
