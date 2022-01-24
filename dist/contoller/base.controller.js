"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseController {
    constructor() {
        this._router = (0, express_1.Router)();
    }
    get router() {
        return;
    }
}
