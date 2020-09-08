"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./data/list");
var cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var onlineUsersMap = new Map();
app.use(cors());
app.get('/get/online/users/:username', (req, res) => {
    var _a;
    let username = req.params.username;
    console.log("request from" + username);
    let friendIDs = (_a = list_1.userList.find(user => user.username === username)) === null || _a === void 0 ? void 0 : _a.friendsId;
    // console.log(friendIDs);
    let onlineUserArr = [];
    //   console.log(friendIDs);
    if (friendIDs !== undefined) {
        friendIDs.forEach(fID => {
            if (onlineUsersMap.has(fID)) {
                let us = onlineUsersMap.get(fID);
                us.date = undefined;
                onlineUserArr.push(us);
            }
        });
    }
    res.json({
        message: "addv",
        body: onlineUserArr
    });
});
io.on('connection', (socket) => {
    socket.on("new-user-joined", (joinedUser) => {
        let newUser = new list_1.OnlineUser();
        newUser.username = joinedUser.username;
        newUser.socketId = socket.id;
        newUser.date = joinedUser.date || new Date();
        console.log(socket.id + ": " + newUser.username);
        let dbUser = list_1.userList.find(user => user.username === newUser.username);
        if (dbUser === undefined) {
            socket.disconnect();
            return;
        }
        let friendsIDs = dbUser === null || dbUser === void 0 ? void 0 : dbUser.friendsId;
        if (friendsIDs !== undefined) {
            friendsIDs.forEach((id) => {
                let onlineUser = onlineUsersMap.get(id);
                if ((onlineUser === null || onlineUser === void 0 ? void 0 : onlineUser.socketId) !== undefined) {
                    newUser.date = undefined;
                    socket.in(onlineUser.socketId).emit("friend-is-online", (newUser));
                }
            });
        }
        onlineUsersMap.set(dbUser.userID, newUser);
        //   console.log(newUser.username)
    });
    socket.on("send-message", (msg) => {
        msg.senderID = socket.id;
        console.log(msg);
        socket.in(msg.receiverID).emit("receive-message", msg);
    });
    socket.on('disconnect', () => {
        let userId;
        for (let [key, value] of onlineUsersMap.entries()) {
            if (value.socketId == socket.id) {
                console.log(value.username + " disconnected");
                userId = key;
                break;
            }
        }
        onlineUsersMap.delete(userId);
        console.log(onlineUsersMap.size);
    });
});
http.listen(3000, () => {
    console.log('listening on *:3000');
});
