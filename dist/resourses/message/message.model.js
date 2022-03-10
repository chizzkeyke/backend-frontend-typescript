"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMessage = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    chat_id: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    unread: { type: Boolean, required: true, default: false }
});
exports.modelMessage = (0, mongoose_1.model)('Message', MessageSchema);
