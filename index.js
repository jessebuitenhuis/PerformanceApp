"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./config/server");
var db = require("./config/db");
db.setupConnection();
server_1.Server.bootstrap();
//# sourceMappingURL=index.js.map