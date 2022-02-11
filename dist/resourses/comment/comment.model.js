"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelComment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    idPost: { type: String, unique: true, required: true },
    author: { type: String, unique: true, required: true },
    body: { type: String, unique: true, required: true },
    date_created: { type: Date, unique: true, required: true }
});
exports.modelComment = (0, mongoose_1.model)('Comment', commentSchema);
