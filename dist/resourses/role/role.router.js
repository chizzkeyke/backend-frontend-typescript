"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRole = void 0;
const express_1 = require("express");
const role_controller_1 = __importDefault(require("./role.controller"));
const routerRole = (0, express_1.Router)();
exports.routerRole = routerRole;
routerRole.get('/role', role_controller_1.default.setRoleToDb);
