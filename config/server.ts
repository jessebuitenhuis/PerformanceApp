import * as express from 'express';
import * as session from 'express-session';
import * as path from "path";
import {api} from "../api";
import * as passport from 'passport';
import * as passportConfig from './passport';

export class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this._config();
        this._start();
    }

    private _config() : void {
        // Serve static files
        this.app.use('/node_modules', express.static('node_modules'));

        // Serve generated typescript files
        this.app.use(express.static('build'));

        // TODO: move client config files to build folder for production
        this.app.use(express.static('client'));

        // Setup authentication
        passportConfig.config(passport);
        this.app.use(session({secret: 'performanceappisfantastic'}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // Serve api routes
        this.app.use('/api', api);

        // Catch all and redirect to angular app
        this.app.get('*', function(req, res){
            res.sendFile(path.resolve('client/index.html'));
        })

    }

    private _start() : void {
        this.app.listen(3000, function(){
            console.log('Performance App started. Listening on port 3000.');
        });
    }
};