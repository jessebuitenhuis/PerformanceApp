import {userApi} from "./user.api";
import {json} from 'body-parser';
import {Router} from "express";
import {authenticate} from "passport";
import {authApi} from "./auth.api";
import {goalApi} from "./goal.api";
import {teamApi} from "./team.api";

export let api = Router();

// Middleware
api.use(json());

//Public Controllers
api.use(authApi);

//Private Controllers
api.use(authenticate('jwt'));
api.use('/users', userApi);
api.use('/goals', goalApi);
api.use('/teams', teamApi);

// Error Middleware
api.use(errorHandler)

function errorHandler (err : any, req : any, res : any, next : any) : void {
    res.status(500).send(err.message);
}