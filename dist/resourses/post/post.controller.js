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
exports.postController = void 0;
const post_service_1 = require("./post.service");
class PostController {
    constructor() {
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, post_service_1.getNewPosts)();
                res.status(200).json({
                    data
                });
            }
            catch (e) {
                res.status(500).json({
                    message: 'Ошибка сервера'
                });
            }
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idPost = req.params.id;
                const foundPost = yield (0, post_service_1.getOnePost)(idPost);
                return res.status(200).json({
                    data: foundPost
                });
            }
            catch (e) {
                return res.status(500).json({
                    error: 'Error on server.'
                });
            }
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const { title, body } = req.body;
                if (!token) {
                    return res.status(400).json({
                        error: 'User is not undefined.'
                    });
                }
                const createdPost = (0, post_service_1.createPost)(title, body, token);
                return res.status(201).json({
                    data: createdPost
                });
            }
            catch (e) {
                return res.status(500).json({
                    message: 'Error server'
                });
            }
        });
        this.putPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const { idPost, body, title } = req.body;
                const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
                if (!token) {
                    throw res.status(400).json({
                        error: 'Токен гавно'
                    });
                }
                const updatingPost = yield (0, post_service_1.updatePost)(idPost, body, title, token);
                return res.status(200).json({
                    data: updatingPost
                });
            }
            catch (e) {
                return res.status(500).json({
                    error: e
                });
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            try {
                const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
                const idPost = req.params.id;
                if (!idPost) {
                    throw 'Id post is not a find.';
                }
                if (!token) {
                    throw 'Token is shit';
                }
                const succesfullMessageDelete = yield (0, post_service_1.deletePost)(idPost, token);
                return res.status(200).json({
                    message: succesfullMessageDelete
                });
            }
            catch (e) {
                return res.status(500).json({
                    error: 'Error on server.'
                });
            }
        });
        this.getPostsAuthUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            try {
                const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')[1];
                if (!token) {
                    throw 'Токен фуфло';
                }
                const posts = yield (0, post_service_1.getPostsAuthUser)(token);
                return res.status(200).json({
                    data: posts
                });
            }
            catch (e) {
                return res.status(500).json({
                    message: e
                });
            }
        });
    }
}
exports.postController = new PostController();
