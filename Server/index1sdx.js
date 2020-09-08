const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const data = require('./data/user-list')

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

let onlineUserArray = data.onlineUserArray;

let userList = data.userList;

io.on('connection', (socket) => {


    socket.on('disconnect', () => {
        console.log(socket.id);
        console.log('user disconnected');
        let b = onlineUserArray.findIndex((u) => u.id === socket.id);
        onlineUserArray.splice(b, 1);
    });

    console.log(onlineUserArray);

    socket.on("new-user-joined", (m) => {
        let singleOnlineUser = data.getOnlineUser();
        singleOnlineUser.chatID = socket.id;
        singleOnlineUser.username = m.username;

        let us = userList.find((u) => u.name === username)

        singleOnlineUser.userID = us.userID;


        onlineUserArray.push(singleOnlineUser);


    })


});
http.listen(3000, () => {
    console.log('listening on *:3000');
});