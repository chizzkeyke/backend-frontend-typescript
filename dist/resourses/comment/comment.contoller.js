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
const comment_service_1 = require("./comment.service");
class CommentController {
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPost } = req.params;
                const commentsPost = yield (0, comment_service_1.getCommentsSelectedPost)(idPost);
                return res.status(200).json({
                    data: commentsPost
                });
            }
            catch (e) {
                return res.status(400).json({
                    message: 'Error create comment.'
                });
            }
        });
    }
    postComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPost } = req.params;
                const { body, author } = req.body;
                const newComment = yield (0, comment_service_1.createCommentSelectedPost)(idPost, author, body);
                return res.status(200).json({
                    data: newComment
                });
            }
            catch (e) {
                return res.status(500).json({
                    message: 'Error create comment.'
                });
            }
        });
    }
    putComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPost } = req.params;
                const { author, body, idComment } = req.body;
                const updatePost = yield (0, comment_service_1.updateCommentSelectedPost)(idPost, idComment, author, body);
                return res.status(200).json({
                    data: updatePost
                });
            }
            catch (error) {
                return res.status(500).json({
                    error
                });
            }
        });
    }
    deleteComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComment } = req.params;
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token)
                    throw 'Token is not a find.';
                const result = yield (0, comment_service_1.deleteSelectedComment)(token, idComment);
                res.status(200).json({
                    data: result
                });
            }
            catch (error) {
                return res.status(500).json({
                    error
                });
            }
        });
    }
}
exports.CommentController = CommentController;
exports.default = new CommentController();
