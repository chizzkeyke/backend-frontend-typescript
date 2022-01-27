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
const post_router_1 = require("./resourses/post/post.router");
const user_router_1 = require("./resourses/user/user.router");
const app = (0, express_1.default)();
const port = 8000;
const urlDB = 'mongodb+srv://romeo:minigun9876@cluster0.xyeha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', post_router_1.routerPost);
app.use('/api', user_router_1.routerUser);
app.get('/', (req, res) => {
    logger_service_1.default.log('Запрос на путь "/"');
    res.status(200).json({
        message: 'Удачно всё получилось.'
    });
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(urlDB);
        app.listen(port, () => {
            logger_service_1.default.log(`Server start work on port ${port}`);
        });
    }
    catch (error) {
        logger_service_1.default.error(`Server error.`);
    }
});
bootstrap()
    .then(() => {
    logger_service_1.default.log('connected to db is successful');
})
    .catch(() => {
    logger_service_1.default.log('Server not work.');
});
