"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationSetting_1 = require("../utils/validationSetting");
const logger_service_1 = __importDefault(require("../logger/logger.service"));
const validationMiddleware = (req, res, next) => {
    (0, validationSetting_1.validationExamination)(req.body)
        .then(() => {
        logger_service_1.default.log('Проверка удачно пройдена');
        next();
    })
        .catch((e) => {
        logger_service_1.default.error('Ошибка валидации');
        res.status(400).json({
            message: e.message
        });
    });
};
exports.validationMiddleware = validationMiddleware;
