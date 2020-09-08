import { Request, Response } from "express";
import { Socket } from "socket.io";
import { Message, OnlineUser, User, userList } from "./data/list";
var cors = require('cors')

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var onlineUsersMap = new Map<string, OnlineUser>();

app.use(cors())
app.get('/get/online/users/:username', (req: Request, res: Response) => {
    let username = req.params.username;
      console.log("request from" + username)
    let friendIDs = userList.find(user => user.username === username)?.friendsId;
    // console.log(friendIDs);
    let onlineUserArr: OnlineUser[] = [];
    //   console.log(friendIDs);
    if (friendIDs !== undefined) {
        friendIDs.forEach(fID => {
            if (onlineUsersMap.has(fID)) {
                let us = onlineUsersMap.get(fID);
                us.date = undefined;
                onlineUserArr.push(us);
            }
        })
    }

    res.json({
        message: "addv",
        body: onlineUserArr
    })

})


io.on('connection', (socket: Socket) => {

    socket.on("new-user-joined", (joinedUser: OnlineUser) => {
        let newUser = new OnlineUser();
        newUser.username = joinedUser.username;
        newUser.socketId = socket.id;
        newUser.date = joinedUser.date || new Date();

            console.log(socket.id  + ": " + newUser.username);


        let dbUser: User = userList.find(user => user.username === newUser.username);

        if (dbUser === undefined) {
            socket.disconnect();
            return;
        }
        let friendsIDs = dbUser?.friendsId;
        if (friendsIDs !== undefined) {
            friendsIDs.forEach((id: string) => {
                let onlineUser = onlineUsersMap.get(id);
                if (onlineUser?.socketId !== undefined) {
                    newUser.date = undefined;
                    socket.in(onlineUser.socketId).emit("friend-is-online", (newUser))
                }
            })
        }
        onlineUsersMap.set(dbUser.userID, newUser);
     //   console.log(newUser.username)

    })

    socket.on("send-message", (msg: Message) => {
        msg.senderID=socket.id;
        console.log(msg);
        socket.in(msg.receiverID).emit("receive-message", msg);
    })

    socket.on('disconnect', () => {
        let userId: string;
        for (let [key, value] of onlineUsersMap.entries()) {
            if (value.socketId == socket.id) {
                console.log(value.username + " disconnected")
                userId = key;
                break;
            }
        }
        onlineUsersMap.delete(userId);
        console.log(onlineUsersMap.size)
    });
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});





