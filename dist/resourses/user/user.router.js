"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const user_contoller_1 = __importDefault(require("../user/user.contoller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.use('/self', auth_middleware_1.authMiddleware);
routerUser.post('/login', user_contoller_1.default.login);
routerUser.post('/register', user_contoller_1.default.register);
routerUser.get('/self', user_contoller_1.default.getDataAboutAuthUser);
