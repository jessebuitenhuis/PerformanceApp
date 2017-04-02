import {userApi} from "./user.api";
import {json} from 'body-parser';
import {Router} from "express";
import {authenticate} from "passport";
import {encode} from 'jwt-simple';
import {appSecret, generateToken} from '../config/passport';
import {User} from "../models/User";
import {IToken} from "../interfaces/IToken";
import * as moment from 'moment';

export let api = Router();

// Middleware
api.use(json());

// Authentication
api.post('/login', authenticate('local'), function(req, res, next){
    let token = generateToken(req.user);
    res.setHeader('X-AUTH-TOKEN', token);
    res.send();

});
api.post('/logout', function(req, res, next){
    req.logOut();
    res.send();
});

api.post('/signup', function(req, res, next){
    User.create(req.body, function(err, user){
        if (err) return next(err);
        res.send(user);
    });
})

// Api Controllers
api.use('/users', userApi);

// Error Middleware
api.use(errorHandler)

function errorHandler (err : any, req : any, res : any, next : any) : void {
    res.status(500).send(err.message);
}

