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
exports.deleteAllCommentsChoosesPost = exports.deleteSelectedComment = exports.updateCommentSelectedPost = exports.createCommentSelectedPost = exports.getCommentsSelectedPost = void 0;
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
const user_model_1 = require("../user/user.model");
const nanoid_1 = require("nanoid");
function getCommentsSelectedPost(idPost) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comments = yield comment_model_1.modelComment.find({ idPost });
            if (!comments) {
                throw 'Posts is undefined.';
            }
            return comments.reverse();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getCommentsSelectedPost = getCommentsSelectedPost;
function createCommentSelectedPost(idPost, author, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_model_1.modelPost.find({ id: idPost });
            const user = yield user_model_1.modelUser.find({ username: author });
            if (!post) {
                throw 'Post if not a find.';
            }
            if (!user) {
                throw 'User is not find.';
            }
            const comment = yield comment_model_1.modelComment.create({
                id: (0, nanoid_1.nanoid)(),
                idPost,
                author,
                body,
                date_created: Date.now()
            });
            yield comment.save();
            return comment;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createCommentSelectedPost = createCommentSelectedPost;
function updateCommentSelectedPost(idPost, idComment, author, newBody) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_model_1.modelPost.findOne({ id: idPost });
            const comment = yield comment_model_1.modelComment.findOne({ id: idComment });
            if (!post)
                throw 'Post is not a find.';
            if (!comment)
                throw 'Comment is not a find.';
            if (comment.author !== author)
                throw "This user can't update this comment.";
            const updatingComment = yield comment_model_1.modelComment.findOneAndUpdate({ id: idComment }, { body: newBody }, {
                new: true
            });
            if (!updatingComment)
                throw "Can't update comment.";
            return updatingComment;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateCommentSelectedPost = updateCommentSelectedPost;
function deleteSelectedComment(token, idComment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.modelUser.findOne({ token });
            const comment = yield comment_model_1.modelComment.findOne({ id: idComment });
            if (!user)
                throw 'User is not find.';
            if (!comment)
                throw 'Comment us not a find.';
            if (user.username !== comment.author)
                throw "This user can't delete this comment.";
            yield user_model_1.modelUser.findOneAndDelete({ id: idComment });
            return 'Post delete succesfull.';
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteSelectedComment = deleteSelectedComment;
function deleteAllCommentsChoosesPost(idPost) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield comment_model_1.modelComment.deleteMany({ idPost });
            return 'All posts delete.';
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteAllCommentsChoosesPost = deleteAllCommentsChoosesPost;
