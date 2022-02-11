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
exports.CommentController = void 0;
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
const user_model_1 = require("../user/user.model");
const nanoid_1 = require("nanoid");
class CommentController {
    getCommentsSelectedPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPost } = req.params;
                console.log(idPost);
            }
            catch (e) {
            }
        });
    }
    postCommentSelectedPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPost, body, author } = req.body;
                const selectPost = yield post_model_1.modelPost.findOne({ id: idPost });
                const senderName = yield user_model_1.modelUser.findOne({ username: author });
                if (!selectPost) {
                    return res.status(400).json({
                        error: 'Post is not a find.'
                    });
                }
                if (!senderName) {
                    return res.status(400).json({
                        error: 'Author is undefined.'
                    });
                }
                const newComment = yield comment_model_1.modelComment.create({
                    id: (0, nanoid_1.nanoid)(),
                    idPost,
                    author,
                    body,
                    date_created: Date.now()
                });
                yield newComment.save();
                return res.status(200).json({
                    data: newComment
                });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({
                    message: 'Error create comment.'
                });
            }
        });
    }
}
exports.CommentController = CommentController;
exports.default = new CommentController();
