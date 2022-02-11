"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelPost = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true }
});
exports.modelPost = (0, mongoose_1.model)('Post', PostSchema);
