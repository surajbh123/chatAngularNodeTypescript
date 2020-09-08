
class User {
    username: string;
    userID: string;
    friendsId ? : string[];
    constructor(username: string, userID: string, friendsId ?  : string[]) {
        this.username = username;
        this.userID = userID;
        this.friendsId = friendsId;
    }
}

interface Message {
    text: string;
    senderID: string;
    receiverID: string;
    username:string;
    date:Date; 
}

var userList: User[] = [
    new User('iron', '111', ['333', '444','222']),
    new User('captain', '222', ['444', '555','111']),
    new User('antman', '333', ['111']),
    new User('hulk', '444', ['111', '222']),
    new User('thor', '555', ['222']),
    new User('tachela', '666'),
];

class OnlineUser{ 
  username ?: string;
  date: Date = new Date();
  socketId ? : string;
  constructor ( username? : string,socketId? : string){
      this.socketId = socketId;
      this.username = username;
  }
}
 export interface NewUser{
     username:string;

 }

export {userList,Message,User,OnlineUser }


