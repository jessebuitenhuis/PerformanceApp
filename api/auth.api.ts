import * as HttpStatus from 'http-status-codes';
import {Router} from "express";
import {User} from "../models/User";
import {generateToken} from "../config/passport";
import {authenticate} from "passport";

export function authorize(req : any, res : any, next : any) {
    if (!req.isAuthenticated()) return res.status(HttpStatus.UNAUTHORIZED).send();

    return next();
}

export let authApi = Router();

// Public Routes
authApi.post('/login', authenticate('local'), function(req, res, next){
    let token = generateToken(req.user);
    res.setHeader('X-AUTH-TOKEN', token);
    res.send();

});
authApi.post('/logout', function(req, res, next){
    req.logOut();
    res.send();
});

authApi.post('/signup', function(req, res, next){
    User.create(req.body, function(err, user){
        if (err) return next(err);
        res.send(user);
    });
});