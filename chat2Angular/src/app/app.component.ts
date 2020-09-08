import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ChatService } from './chat.service';
import { ChatUser, Message, MessageType, NewOnlineUser, OnlineUser, ReceivedMessage, SentMessage, UserStatus } from './user-message/user-interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  onlineUser: OnlineUser = new OnlineUser();
  ChatUserArray: ChatUser[] = [];
  chatUserIndex:number;
  loadMessage:boolean = false;


  constructor(private chatservice: ChatService) {

  }
   ngOnInit(): void {
    this.onlineUser.username = window.prompt();
    console.warn(this.onlineUser.username);

    

    
    this.chatservice.setupSocketConnection(this.onlineUser);

      this.chatservice.newUserJoined.subscribe((us: OnlineUser) => {
      let chatUser = new ChatUser();
      chatUser.socketId = us.socketId;
      chatUser.username = us.username;
      chatUser.userStatus = UserStatus.ONLINE;
      this.ChatUserArray.push(chatUser);
      console.log(this.ChatUserArray);
    });

    this.chatservice.getOnlineUserUserList(this.onlineUser.username).subscribe((users:any) =>{
      if(users.body.length > 0 )
      users.body.forEach((u:OnlineUser )=>{
        let chatUser = new ChatUser();
          chatUser.socketId = u.socketId;
          chatUser.username = u.username;
          chatUser.userStatus = UserStatus.ONLINE;
          this.ChatUserArray.push(chatUser);
      })  
    }) 


    this.chatservice.receiveMessage.subscribe((msg:ReceivedMessage) =>{
    // console.log(msg);
    let i = 0;
      for (let chatUser of this.ChatUserArray)
       { 
        console.log(i);
         if(chatUser.username === msg.username)
         {
          console.log(chatUser.username)
         //  console.log(chatUser.username)
           let message = new Message();
           message.text = msg.text;
           message.messageType = MessageType.RECEIVED;
           chatUser.messageArray.push(message);
          // this.ChatUserArray[i].messageArray.push(message);
           break;
         }
         ++i;
       }
    })



  }

  sendMessage(messEle:HTMLInputElement,scrollElement:HTMLDivElement) {
   // scrollElement.scrollTop = scrollElement.scrollHeight + 100;
    let msg = new Message();
    msg.text=messEle.value;
    messEle.value="";
    msg.messageType=MessageType.SENT;
    this.ChatUserArray[this.chatUserIndex].messageArray.push(msg);
    scrollElement.scrollTop = scrollElement.scrollHeight + 100;
  //  console.log(this.ChatUserArray)
    let sendmsg = new SentMessage();
    sendmsg.receiverID = this.ChatUserArray[this.chatUserIndex].socketId;
    sendmsg.text=msg.text;
    sendmsg.username=this.onlineUser.username;
     this.chatservice.sendMessage(sendmsg);

  }

  viewMessages(i:number,scrollElement:HTMLDivElement){
    this.loadMessage = false;
    if(this.ChatUserArray[i] !== undefined ){
      this.chatUserIndex = i;
      this.loadMessage = true;
    }
    setTimeout(() =>{
           scrollElement.scrollTop = scrollElement.scrollHeight ;
           
    },100)

  }

}


