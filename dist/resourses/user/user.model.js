"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelUser = void 0;
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    username: { type: 'string', required: true, unique: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    token: { type: 'string', required: true, unique: true },
    role: { type: 'string', required: true, ref: 'Role' }
});
exports.modelUser = (0, mongoose_1.model)("User", User);
