"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.User = exports.OnlineUser = exports.getOnlineUser = exports.onlineUserArray = exports.userList = void 0;
class User {
    constructor(username, userID, friendsId) {
        this.username = username;
        this.userID = userID;
        this.friendsId = friendsId;
    }
}
exports.User = User;
class Message {
    constructor(text, senderID, receiverID) {
        this.text = text;
        this.senderID = senderID;
        this.receiverID = receiverID;
    }
}
exports.Message = Message;
class OnlineUser {
    constructor(username, chatID, userID) {
        this.username = username;
        this.chatID = chatID;
        this.userID = userID;
    }
}
exports.OnlineUser = OnlineUser;
var userList = [
    new User('iron', '111', ['333', '444', '222']),
    new User('captain', '222', ['444', '555', '111']),
    new User('antman', '333', ['111']),
    new User('hulk', '444', ['111', '222']),
    new User('thor', '555', ['222']),
    new User('tachela', '666'),
];
exports.userList = userList;
let onlineUserArray = [];
exports.onlineUserArray = onlineUserArray;
function getOnlineUser() {
    return new OnlineUser();
}
exports.getOnlineUser = getOnlineUser;
