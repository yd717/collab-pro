"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_keys_1 = require("../config.keys");
var socket_io_1 = require("socket.io");
var chalk_1 = __importDefault(require("chalk"));
var chatService = function (httpServer) {
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: config_keys_1.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });
    var socketToRoom = {};
    var userInfoMap = {};
    // remember we want socket-id name and url link
    io.on("connection", function (socket) {
        console.log("A user " + chalk_1.default.green(socket.id.slice(0, 5)) + " conmnection");
        socket.on("join-room", function (userInfo) {
            var _a;
            socket.emit("sid", socket.id);
            var roomID = userInfo.roomID;
            socketToRoom[socket.id] = roomID;
            userInfoMap[socket.id] = userInfo;
            var usersInRoom = (_a = io.sockets.adapter.rooms.get(roomID)) === null || _a === void 0 ? void 0 : _a.size;
            // adding people to rooms
            if (!usersInRoom || usersInRoom < 4) {
                socket.join(roomID);
                // here also add the peerJS ID
                socket.broadcast.to(roomID).emit("new-user-joined", userInfoMap[socket.id]);
            }
            else {
                socket.emit("room-full");
                return;
            }
        });
        socket.on("send-message", function (body) {
            var roomID = body.userInfo.roomID;
            body.socketID = socket.id;
            socket.broadcast.to(roomID).emit("message", body);
        });
        socket.on("input-data", function (props) {
            var roomID = props.roomID;
            socket.broadcast.to(roomID).emit("emit-input-data", props.data);
        });
        socket.on("programming-language", function (props) {
            var roomID = props.roomID;
            socket.broadcast.to(roomID).emit("emit-programming-language", props.data);
        });
        socket.on("selected-question", function (props) {
            var roomID = props.roomID;
            socket.broadcast.to(roomID).emit("emit-selected-question", props.data);
        });
        socket.on("codeforces", function (props) {
            var roomID = props.roomID;
            socket.broadcast.to(roomID).emit("emit-codeforces", props.data);
        });
        socket.on("code-executed", function (props) {
            var roomID = props.roomID;
            socket.broadcast.to(roomID).emit("emit-code-executed", props.data);
        });
        socket.on("disconnect", function () {
            var roomID = socketToRoom[socket.id];
            var tempData = userInfoMap[socket.id];
            delete socketToRoom[socket.id];
            delete userInfoMap[socket.id];
            socket.broadcast.in(roomID).emit("user-left", tempData);
            console.log("A user " + chalk_1.default.redBright(socket.id.slice(0, 5)) + "  disconnected");
        });
    });
};
exports.default = chatService;
