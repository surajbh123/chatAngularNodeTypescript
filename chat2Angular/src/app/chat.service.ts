import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment'
import { NewOnlineUser, OnlineUser, ReceivedMessage, SentMessage } from './user-message/user-interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;
  newUserJoined = new Subject();
  receiveMessage = new Subject();
  constructor(private http: HttpClient) { }

  getOnlineUserUserList(username: string) {
    return this.http.get("http://localhost:3000/get/online/users/" + username)
  }


  setupSocketConnection(onlineUser: OnlineUser) {

    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on("friend-is-online", (user: OnlineUser) => {
      this.newUserJoined.next(user);

    });


    this.socket.on("receive-message", (msg:ReceivedMessage) => {
      this.receiveMessage.next(msg);
    })

    this.socket.emit("new-user-joined", onlineUser);
  }

  sendMessage(msg: SentMessage) {
    console.log(msg);
    this.socket.emit("send-message", msg);
  }
}
