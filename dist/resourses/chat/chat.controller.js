"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../user/user.model");
const chat_service_1 = __importDefault(require("./chat.service"));
class ContollerChat {
    getChats(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const findedUser = yield user_model_1.modelUser.findOne({ token });
                if (!findedUser)
                    throw 'User is not a find.';
                const findedChats = yield chat_service_1.default.findChats(findedUser.username);
                return res.status(200).json({
                    data: findedChats
                });
            }
            catch (error) {
                return res.status(400).json({
                    error
                });
            }
        });
    }
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, partner } = req.body;
                yield chat_service_1.default.createNewChat(author, partner);
                return res.status(200).json('Чат создан');
            }
            catch (error) {
                return res.status(400).json({
                    error
                });
            }
        });
    }
}
exports.default = new ContollerChat();
