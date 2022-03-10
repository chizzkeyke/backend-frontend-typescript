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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_service_1 = __importDefault(require("./logger/logger.service"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const post_router_1 = require("./resourses/post/post.router");
const user_router_1 = require("./resourses/user/user.router");
const role_router_1 = require("./resourses/role/role.router");
const comment_router_1 = require("./resourses/comment/comment.router");
const chat_router_1 = require("./resourses/chat/chat.router");
const message_router_1 = require("./resourses/message/message.router");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const port = 8000;
const mongoDbURL = 'mongodb://localhost:27017/backend-typescript';
const serverHTTP = http_1.default.createServer(app);
const io = new socket_io_1.Server(serverHTTP, {
    cors: {
        origin: 'http://localhost:8000',
        methods: ['GET', 'POST']
    },
    transports: ['websocket']
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', post_router_1.routerPost);
app.use('/api', user_router_1.routerUser);
app.use('/api', role_router_1.routerRole);
app.use('/api', comment_router_1.routerComment);
app.use('/api', chat_router_1.routerChat);
app.use('/api', message_router_1.routerMessage);
(0, socket_1.ioController)(io);
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoDbURL);
        serverHTTP.listen(port, () => {
            logger_service_1.default.log(`Server start work on port ${port}`);
        });
    }
    catch (error) {
        logger_service_1.default.error(`Server error.`);
    }
});
bootstrap()
    .catch(err => logger_service_1.default.error(err));
