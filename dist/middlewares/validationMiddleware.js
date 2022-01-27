"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddlewareCreateUser = void 0;
const validationSetting_1 = require("../utils/validationSetting");
const logger_service_1 = __importDefault(require("../logger/logger.service"));
const validationMiddlewareCreateUser = (req, res, next) => {
    (0, validationSetting_1.validateControl)(req.body)
        .then(() => {
        next();
    })
        .catch((err) => {
        logger_service_1.default.error(err);
        res.status(400).json({
            err
        });
    });
};
exports.validationMiddlewareCreateUser = validationMiddlewareCreateUser;
