import {userApi} from "./user";
import { json } from 'body-parser';
import {Router} from "express";
import * as passport from "passport";
import * as HttpStatus from 'http-status-codes';

export let api = Router();

// Middleware
api.use(json());

// Authentication
api.post('/login', passport.authenticate('local'), function(req, res, next){
    console.log('user', req.user);
    res.send('Logged in succesfully');

});
api.post('/logout', function(req, res, next){
    req.logOut();
    res.send('Logged out...');
});

// Api Controllers
api.use('/users', userApi);

// Error Middleware
api.use(errorHandler)

function errorHandler (err : any, req : any, res : any, next : any) : void {
    res.status(500).send(err.message);
}

