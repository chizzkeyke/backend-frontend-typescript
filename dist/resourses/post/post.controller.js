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
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
const nanoid_1 = require("nanoid");
class PostController {
    constructor() {
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_model_1.modelPost.find();
                const reversePost = posts.reverse();
                const data = [];
                for (let i = 0; i <= 9; i++) {
                    data.push(reversePost[i]);
                }
                return res.status(200).json({
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
                const foundPost = yield post_model_1.modelPost.findOne({ id: idPost });
                if (!foundPost) {
                    return res.status(400).json({
                        message: 'Post is not find.'
                    });
                }
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
                const user = yield user_model_1.modelUser.findOne({ token });
                if (!user) {
                    return res.status(400).json({
                        message: 'User is not find.'
                    });
                }
                const { title, body } = req.body;
                const createdPost = yield post_model_1.modelPost.create({
                    id: (0, nanoid_1.nanoid)(),
                    title,
                    body,
                    author: user.username
                });
                yield createdPost.save();
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
            try {
            }
            catch (e) {
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
            }
        });
    }
}
exports.postController = new PostController();
