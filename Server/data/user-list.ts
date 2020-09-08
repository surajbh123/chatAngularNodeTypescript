
class User {
    username?: string;
    userID?: string;
    friendsId?: string[];
    constructor(username?: string, userID?: string, friendsId?: string[]) {
        this.username = username;
        this.userID = userID;
        this.friendsId = friendsId;
    }

}

class Message {
    text: string;
    senderID: string;
    receiverID: string;
    constructor(text: string, senderID: string, receiverID: string)
    {
        this.text = text;
        this.senderID = senderID;
        this.receiverID = receiverID;
    }

}

class OnlineUser {
    username?: string;
    chatID?: string;
    userID?: string;
    constructor(username?: string, chatID?: string,userID?: string) {
        this.username = username;
        this.chatID = chatID;
        this.userID = userID;
    }
}


var userList: User[] = [
    new User('iron', '111', ['333', '444','222']),
    new User('captain', '222', ['444', '555','111']),
    new User('antman', '333', ['111']),
    new User('hulk', '444', ['111', '222']),
    new User('thor', '555', ['222']),
    new User('tachela', '666'),
];

let onlineUserArray: OnlineUser[] = [];


function getOnlineUser(): OnlineUser {
    return new OnlineUser();
}



export { userList, onlineUserArray, getOnlineUser, OnlineUser,User,Message };


