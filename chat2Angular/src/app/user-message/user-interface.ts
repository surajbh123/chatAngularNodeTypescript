export class OnlineUser{
  username : string;
  date: Date = new Date();
  socketId  : string;
    
}

export interface NewOnlineUser{
  username: string;
  socketId: string;
}

export class ReceivedMessage{
  text: string;
  senderID: string;
  date: Date;
  username: string;

}

export class SentMessage{
  text: string;
  receiverID: string;
  date: Date;
  username: string;
}


export class ChatUser{
 username :string;
 socketId: string;
 messageArray:Message[]=[];
 userStatus:UserStatus;

}

export class Message{
  text:string;
  date: Date;
  messageType:MessageType;
}

export enum MessageType{
  SENT,RECEIVED
}

export enum UserStatus{
  ONLINE="",OFFLINE="offline"
}