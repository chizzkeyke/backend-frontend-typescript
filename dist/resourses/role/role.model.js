"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelRole = void 0;
const mongoose_1 = require("mongoose");
const Role = new mongoose_1.Schema({
    role: { type: String, required: true, default: 'USER' }
});
exports.modelRole = (0, mongoose_1.model)('Role', Role);
