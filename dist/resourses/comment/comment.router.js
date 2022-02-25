"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerComment = void 0;
const express_1 = require("express");
const comment_contoller_1 = __importDefault(require("./comment.contoller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const routerComment = (0, express_1.Router)();
exports.routerComment = routerComment;
routerComment.use('/comment', auth_middleware_1.authMiddleware);
routerComment.get('/comment/:idPost', comment_contoller_1.default.getComments);
routerComment.post('/comment/:idPost', comment_contoller_1.default.postComment);
routerComment.put('/comment/:idPost', comment_contoller_1.default.putComment);
routerComment.delete('/comment/:idComment', comment_contoller_1.default.deleteComment);
