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
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const message_model_1 = require("./message.model");
class MessageService {
    createNewMessage(author, body, chat_id, save) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield message_model_1.modelMessage.create({
                    id: (0, nanoid_1.nanoid)(),
                    chat_id,
                    author,
                    body,
                });
                if (save) {
                    yield newMessage.delete();
                }
                return newMessage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getOneMessage(idRoom, body, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findedMessage = yield message_model_1.modelMessage.findOne({ chat_id: idRoom, body, author });
                console.log(findedMessage);
                if (!findedMessage) {
                    throw 'Message is not a find';
                }
                return findedMessage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllMessagesOfCurrentChat(chat_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_model_1.modelMessage.find({ chat_id });
                if (!messages)
                    throw 'Messages is not a found.';
                return messages;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new MessageService();
