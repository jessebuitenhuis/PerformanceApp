"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
;
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.userSchema.virtual('name').get(function () {
    return [this.firstName, this.lastName].join(' ');
});
exports.userSchema.virtual('id').get(function () {
    return this._id;
});
exports.userSchema.set('toJSON', { virtuals: true });
exports.User = mongoose_1.model("User", exports.userSchema);
//# sourceMappingURL=User.js.map