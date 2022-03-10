"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true, ref: 'User' },
    partner: { type: String, required: true, ref: 'User' },
    messages: { type: [], required: true, default: [] }
});
exports.ChatModel = (0, mongoose_1.model)('Chat', ChatSchema);
