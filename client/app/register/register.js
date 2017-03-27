System.register(["@angular/core", "../resources/user.resource"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, user_resource_1, RegisterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_resource_1_1) {
                user_resource_1 = user_resource_1_1;
            }
        ],
        execute: function () {
            RegisterComponent = class RegisterComponent {
                constructor(_userResource) {
                    this._userResource = _userResource;
                    this.user = this._userResource.createModel();
                }
            };
            RegisterComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/register/register.component.html'
                }),
                __metadata("design:paramtypes", [user_resource_1.UserResource])
            ], RegisterComponent);
            exports_1("RegisterComponent", RegisterComponent);
        }
    };
});
