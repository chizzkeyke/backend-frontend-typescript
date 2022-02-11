"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPost = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const post_controller_1 = require("./post.controller");
const routerPost = (0, express_1.Router)();
exports.routerPost = routerPost;
routerPost.use('/post', auth_middleware_1.authMiddleware);
routerPost.get('/post', post_controller_1.postController.getPosts);
routerPost.get('/post/:id', post_controller_1.postController.getPost);
routerPost.post('/post', post_controller_1.postController.createPost);
routerPost.put('/post', post_controller_1.postController.putPost);
routerPost.delete('/post/:id', post_controller_1.postController.deletePost);
