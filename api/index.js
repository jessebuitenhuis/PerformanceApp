"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var body_parser_1 = require("body-parser");
var express_1 = require("express");
exports.api = express_1.Router();
// Middleware
exports.api.use(body_parser_1.json());
// Api Controllers
exports.api.use('/users', user_1.userApi);
// Error Middleware
exports.api.use(errorHandler);
function errorHandler(err, req, res, next) {
    res.status(500).send(err.message);
}
//# sourceMappingURL=index.js.map