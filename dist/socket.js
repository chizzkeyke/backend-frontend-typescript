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
exports.ioController = void 0;
const chat_service_1 = __importDefault(require("./resourses/chat/chat.service"));
const message_service_1 = __importDefault(require("./resourses/message/message.service"));
function ioController(io) {
    io.on('connection', (socket) => {
        socket.on('ROOM:CREATE', ({ author, partner }) => __awaiter(this, void 0, void 0, function* () {
            const newChat = yield chat_service_1.default.createNewChat(author, partner);
            socket.to(newChat.id).emit(`Chat №${newChat.id} was created.`);
        }));
        socket.on('ROOM:ENTER', ({ roomId, username }) => {
            socket.join(roomId);
            console.log(`${username} enter in room ${roomId}`);
        });
        socket.on('MESSAGE:SEND', ({ idRoom, messageBody, author }) => __awaiter(this, void 0, void 0, function* () {
            const newMessage = yield message_service_1.default.createNewMessage(author, messageBody, idRoom, true);
            socket.broadcast.to(idRoom).emit('MESSAGE:RECEIVED', newMessage);
        }));
        socket.on('MESSAGE:WRITING', ({ roomId }) => {
            socket.broadcast.to(roomId).emit('MESSAGE:WRITING', 'User writing message');
        });
    });
}
exports.ioController = ioController;
