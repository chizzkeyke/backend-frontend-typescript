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
exports.getPostsAuthUser = exports.deletePost = exports.updatePost = exports.createPost = exports.getOnePost = exports.getNewPosts = void 0;
const post_model_1 = require("./post.model");
const user_model_1 = require("../user/user.model");
const nanoid_1 = require("nanoid");
const comment_service_1 = require("../comment/comment.service");
function getNewPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield post_model_1.modelPost.find();
        const reversePosts = posts.reverse();
        const data = [];
        reversePosts.forEach(post => data.push(post));
        return data;
    });
}
exports.getNewPosts = getNewPosts;
function getOnePost(idPost) {
    return __awaiter(this, void 0, void 0, function* () {
        const findedPost = yield post_model_1.modelPost.findOne({ id: idPost });
        return findedPost;
    });
}
exports.getOnePost = getOnePost;
function createPost(title, body, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.modelUser.findOne({ token });
        const id = (0, nanoid_1.nanoid)();
        if (!user) {
            return 'This user is not undefined.';
        }
        const newPost = yield post_model_1.modelPost.create({
            id,
            title,
            body,
            author: user.username
        });
        newPost.save();
        return newPost;
    });
}
exports.createPost = createPost;
function updatePost(idPost, body, title, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.modelUser.findOne({ token });
            const findPost = yield post_model_1.modelPost.findOne({ id: idPost });
            if (!user) {
                throw 'This user is not undefined.';
            }
            if (!findPost) {
                throw 'Post is not a find.';
            }
            if (user.username !== findPost.author) {
                throw 'Author is not have this post.';
            }
            const updatingPost = yield post_model_1.modelPost.findOneAndUpdate({ id: idPost }, { body, title }, {
                new: true
            });
            if (!updatingPost) {
                throw 'Не удалось обновить пост';
            }
            return {
                id: updatingPost.id,
                title: updatingPost.title,
                body: updatingPost.body,
                author: updatingPost.author
            };
        }
        catch (e) {
            throw e;
        }
    });
}
exports.updatePost = updatePost;
function deletePost(idPost, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.modelUser.findOne({ token });
            const post = yield post_model_1.modelPost.findOne({ id: idPost });
            if (!user) {
                throw 'Такого пользователя нет';
            }
            if (!post) {
                throw 'Такого поста нет.';
            }
            if (user.username !== post.author) {
                throw "User can't delete this post.";
            }
            yield post.deleteOne({ id: idPost });
            yield (0, comment_service_1.deleteAllCommentsChoosesPost)(idPost);
            return 'Post delete successfull.';
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deletePost = deletePost;
function getPostsAuthUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.modelUser.findOne({ token });
        if (!user) {
            throw 'Пользователь не найден';
        }
        const posts = yield post_model_1.modelPost.find({ author: user.username });
        return posts;
    });
}
exports.getPostsAuthUser = getPostsAuthUser;
