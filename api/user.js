"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var HttpStatus = require("http-status-codes");
var express_1 = require("express");
exports.userApi = express_1.Router();
exports.userApi.get('/', function (req, res, next) {
    User_1.User.find({}, function (err, users) {
        if (err)
            return next(err);
        users = users.map(function (user) { return user.toJSON({ virtuals: true }); });
        res.send(users);
    });
});
exports.userApi.get('/:id', function (req, res, next) {
    User_1.User.findById(req.params.id, function (err, user) {
        if (err)
            return next(err);
        if (user == null)
            res.status(HttpStatus.NOT_FOUND).send("User with given id not found.");
        res.send(user.toJSON({ virtuals: true }));
    });
});
exports.userApi.post('/', function (req, res, next) {
    User_1.User.create(req.body, function (err, user) {
        if (err)
            return next(err);
        res.send(user);
    });
});
exports.userApi.put('/:id', function (req, res, next) {
    User_1.User.findByIdAndUpdate(req.params.id, req.body, { 'new': true, upsert: true }, function (err, user) {
        if (err)
            return next(err);
        res.send(user.toJSON());
    });
});
exports.userApi.delete('/:id', function (req, res, next) {
    User_1.User.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return next(err);
        res.status(200).send();
    });
});
//# sourceMappingURL=user.js.map