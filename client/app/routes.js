System.register(["./users/users.component", "./register/register"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var users_component_1, register_1, appRoutes;
    return {
        setters: [
            function (users_component_1_1) {
                users_component_1 = users_component_1_1;
            },
            function (register_1_1) {
                register_1 = register_1_1;
            }
        ],
        execute: function () {
            exports_1("appRoutes", appRoutes = [
                {
                    component: users_component_1.UsersComponent,
                    path: 'users'
                },
                {
                    component: register_1.RegisterComponent,
                    path: 'register'
                }
            ]);
        }
    };
});
