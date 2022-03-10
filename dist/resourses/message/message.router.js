"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMessage = void 0;
const express_1 = require("express");
const message_controller_1 = __importDefault(require("./message.controller"));
const routerMessage = (0, express_1.Router)();
exports.routerMessage = routerMessage;
routerMessage.post('/message', message_controller_1.default.postMessage);
routerMessage.get('/messages/:id', message_controller_1.default.getMessages);
