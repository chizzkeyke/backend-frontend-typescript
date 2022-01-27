"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const user_contoller_1 = __importDefault(require("../user/user.contoller"));
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.use('/register' || '/login', validationMiddleware_1.validationMiddlewareCreateUser);
routerUser.post('/login', user_contoller_1.default.login);
routerUser.post('/register', user_contoller_1.default.register);
routerUser.get('/self');
