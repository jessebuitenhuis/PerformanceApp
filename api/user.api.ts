import {User} from "../models/User";
import {Router} from "express";
import * as HttpStatus from 'http-status-codes';
import * as passport from "passport";

export let userApi = Router();

userApi.use(passport.authenticate('jwt'));

userApi.get('/', function(req, res, next){
    console.log(req.user);
    User.find({}, function(err, users) {
        if (err) return next(err);
        users = <any> users.map(user => user.toJSON());
        res.send(users);
    });
});

userApi.get('/:id', function(req, res, next) : void {
   User.findById(req.params.id, function(err, user){
       if (err) return next(err);
       if (user == null) res.status(HttpStatus.NOT_FOUND).send("User with given id not found.");
       res.send(user.toJSON());
   });
});

userApi.post('/', function(req, res, next) : void{

    console.log(req.body);
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

