import { Strategy as LocalStrategy } from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {IUser} from "../interfaces/IUser";
import {PassportStatic} from "passport";
import * as jwt from 'jwt-simple';
import {User} from "../models/User";
import {IToken} from "../interfaces/IToken";
import {encode} from "jwt-simple";
import * as moment from 'moment';
import {JwtHelper} from "angular2-jwt";
import { sign } from 'jsonwebtoken';

export const appSecret = 'thisappissuperawesome';
export const tokenName = 'performance_app_token';
export const tokenPrefix = 'Bearer';

export function generateToken(user: IUser) : string {
    let tokenData : IToken = {
        user_id: user._id,
        exp: moment().add(15, 'seconds').seconds()
    }
    let token = encode(tokenData, appSecret);

    return [tokenPrefix, token].join(' ');
}

export function config(passport : PassportStatic) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({email: username}, function (err, user) {
                if (err) return done(err);
                if (user === null) return done(null, false, {message: 'Incorrect username.'});

                user.validatePassword(password, function(err, isMatch){
                    if (err) return done(err);
                    if (!isMatch) return done(null, false, {message: 'Incorrect password.'});
                    return done(null, user);
                });
            });
        })
    );

    passport.use('jwt', new JwtStrategy({
        secretOrKey: appSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        ignoreExpiration: false
    }, function(payload : IToken, done : any){
        console.log(payload);

        User.findById(payload.user_id, function(err, user){
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Token not valid.'});
            return done(null, user);
        });
    }));

    passport.serializeUser(function (user: any, done){
        done(null, user._id);
    });

    passport.deserializeUser(function (id: any, done) {
        User.findById(id, done);
    });


}
