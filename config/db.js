"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function setupConnection() {
    mongoose_1.connect('mongodb://localhost/performance-app');
    var db = mongoose_1.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database connection established!');
    });
}
exports.setupConnection = setupConnection;
//# sourceMappingURL=db.js.map