"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerChat = void 0;
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("./chat.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const routerChat = (0, express_1.Router)();
exports.routerChat = routerChat;
routerChat.use('/chats', auth_middleware_1.authMiddleware);
routerChat.get('/chats', chat_controller_1.default.getChats);
routerChat.post('/chats', chat_controller_1.default.createChat);
