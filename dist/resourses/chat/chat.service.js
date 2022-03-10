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
const chat_model_1 = require("./chat.model");
class ChatService {
    createNewChat(author, partner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newId = (0, nanoid_1.nanoid)();
                const newChat = yield chat_model_1.ChatModel.create({
                    id: newId,
                    author,
                    partner
                });
                yield newChat.save();
                return newChat;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addMessageInChat(message, idChat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield chat_model_1.ChatModel.findOne({ id: idChat });
                if (!chat)
                    throw 'Chat is not a find.';
                chat.messages.push(message);
                yield chat.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findChat(roomID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findedRoom = yield chat_model_1.ChatModel.findOne({ id: roomID });
                if (!findedRoom)
                    throw 'Room is not a find.';
                return findedRoom;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findChats(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findedChats = yield chat_model_1.ChatModel.find({ author: username });
                if (!findedChats)
                    throw 'Chats is not a find.';
                if (findedChats.length === 0) {
                    findedChats = yield chat_model_1.ChatModel.find({ partner: username });
                }
                return findedChats;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ChatService();
