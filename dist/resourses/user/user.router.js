"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.post('/login');
routerUser.post('/register');
routerUser.get('/self');
