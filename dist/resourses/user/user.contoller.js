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
const user_model_1 = require("./user.model");
const role_model_1 = require("../role/role.model");
const hashPassword_1 = require("../../utils/hashPassword");
const logger_service_1 = __importDefault(require("../../logger/logger.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
function getJWT(email, secret, role) {
    const payload = {
        email, role
    };
    return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '24h' });
}
class userController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const candidate = yield user_model_1.modelUser.findOne({ username });
                if (candidate) {
                    return res.status(400).json({
                        message: 'The user with this login exists.'
                    });
                }
                const role = yield role_model_1.modelRole.findOne({ value: 'USER' });
                const token = getJWT(email, 'Sedfewrg', 'USER');
                const newHashPassword = (0, hashPassword_1.hashPassword)(password);
                const newUser = yield user_model_1.modelUser.create({
                    username,
                    email,
                    password: newHashPassword,
                    token,
                    role
                });
                yield newUser.save();
                return res.status(201).json({
                    message: 'New user was created.',
                    data: token
                });
            }
            catch (e) {
                logger_service_1.default.error('Error register user.');
                logger_service_1.default.error(e);
                res.status(500).json({
                    message: 'Error server in register new user.'
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.modelUser.findOne({ email });
                if (!user) {
                    return res.status(400).json({
                        message: 'User with this email not a find.'
                    });
                }
                const validPassword = bcrypt_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({
                        message: 'Password is not required.'
                    });
                }
                return res.status(200).json({
                    token: user.token
                });
            }
            catch (e) {
                logger_service_1.default.error('');
            }
        });
    }
    getJWT(email, secret) {
        return new Promise((resolve, reject) => {
            (0, jsonwebtoken_1.sign)({
                email,
                iat: Math.floor(Date.now() / 1000),
            }, secret, {
                algorithm: 'HS256'
            }, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    }
    getDataAboutAuthUser() {
    }
}
exports.default = new userController();
