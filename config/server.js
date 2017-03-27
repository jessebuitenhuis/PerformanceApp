"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var api_1 = require("../api");
var Server = (function () {
    function Server() {
        this.app = express();
        this._config();
        this._start();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype._config = function () {
        // Serve static files
        this.app.use(express.static('client'));
        this.app.use('/node_modules', express.static('node_modules'));
        // Serve api routes
        this.app.use('/api', api_1.api);
        // Catch all and redirect to angular app
        this.app.get('*', function (req, res) {
            res.sendFile(path.resolve('client/index.html'));
        });
    };
    Server.prototype._start = function () {
        this.app.listen(3000, function () {
            console.log('Performance App started. Listening on port 3000.');
        });
    };
    return Server;
}());
exports.Server = Server;
;
//# sourceMappingURL=server.js.map