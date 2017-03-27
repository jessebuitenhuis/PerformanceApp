import {userApi} from "./user";
import { json } from 'body-parser';
import {Router} from "express";

export let api = Router();

// Middleware
api.use(json());

// Api Controllers
api.use('/users', userApi);

// Error Middleware
api.use(errorHandler)

function errorHandler (err : any, req : any, res : any, next : any) : void {
    res.status(500).send(err.message);
}