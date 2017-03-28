import * as express from 'express';
import * as path from "path";
import {api} from "../api";

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
        this.app.use(express.static('build'));
        this.app.use('/node_modules', express.static('node_modules'));

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