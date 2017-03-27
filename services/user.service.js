"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.save = function (user, cb) {
        return User_1.User.create(user, function (err, user) {
            if (err)
                return cb(new Error('Error while saving the user: ' + err.message));
            return cb(null, user);
        });
    };
    return UserService;
}());
exports.UserService = UserService;
