"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:7000',
        credentials: true,
    }
});
const socket = ({ io }) => {
    io.on('connection', socket => {
    });
};
