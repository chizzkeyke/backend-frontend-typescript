"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({
                error: 'User is not authenticated.'
            });
        }
        const decodedData = (0, jsonwebtoken_1.verify)(token, 'Sedfewrg');
        next();
    }
    catch (e) {
        return res.status(500).json({
            message: 'Error on server.'
        });
    }
}
exports.authMiddleware = authMiddleware;
