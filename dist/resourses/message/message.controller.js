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
const message_service_1 = __importDefault(require("./message.service"));
class MessageContoller {
    postMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idRoom, messageBody, author } = req.body;
                const newMessage = yield message_service_1.default.createNewMessage(author, messageBody, idRoom, false);
                return res.status(200).json({
                    data: newMessage
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: 'Server Error'
                });
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw 'Id not get';
                const messages = yield (yield message_service_1.default.getAllMessagesOfCurrentChat(id)).reverse();
                return res.status(200).json({
                    data: messages
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: error
                });
            }
        });
    }
}
exports.default = new MessageContoller();
