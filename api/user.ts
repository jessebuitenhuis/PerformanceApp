import {User} from "../models/User";
import * as HttpStatus from "http-status-codes";
import {Router} from "express";

export let userApi = Router();

function isAuthorized(req : any, res : any, next : any) {
    console.log('isloggedin?');

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(HttpStatus.UNAUTHORIZED).send('Not logged in!');
}

userApi.get('/', isAuthorized, function(req, res, next){
    User.find({}, function(err, users) {
        if (err) return next(err);
        users = <any> users.map(user => user.toJSON({virtuals: true}));
        res.send(users);
    });
});

userApi.get('/:id', function(req, res, next) : void {
   User.findById(req.params.id, function(err, user){
       if (err) return next(err);
       if (user == null) res.status(HttpStatus.NOT_FOUND).send("User with given id not found.");
       res.send(user.toJSON({virtuals: true}));
   });
});

userApi.post('/', function(req, res, next) : void{
    User.create(req.body, function(err, user){
        if (err) return next(err);
        res.send(user);
    });
});

userApi.put('/:id', function(req, res, next) : void {
   User.findByIdAndUpdate(req.params.id, req.body, {'new': true, upsert: true}, function(err, user){
      if (err) return next(err);
      res.send(user.toJSON());
   });
});

userApi.delete('/:id', function(req, res, next) : void {
   User.findByIdAndRemove(req.params.id, function(err){
       if (err) return next(err);
       res.status(200).send();
   })
});

