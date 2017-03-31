import { Strategy as LocalStrategy } from 'passport-local';
import {IUser} from "../interfaces/IUser";
import {PassportStatic} from "passport";

var mockUser : IUser = {
    _id: '43534543',
    firstName: 'Jesse',
    lastName: 'Buitenhuis',
    email: 'jessebuitenhuis@gmail.com',
    password: '123456'
};

export function config(passport : PassportStatic) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            if (username !== 'jesse') {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (password !== '123456') {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, mockUser);
        })
    );

    passport.serializeUser(function (user: any, done){
        console.log('serializing...');
        return done(null, '234lkj324lk32lkj');
    });

    passport.deserializeUser(function (id: any, done) {
        console.log('deserialize');
        done(null, mockUser);
    })


}
