/*
 * @Author: 关振俊
 * @Date: 2022-09-22 15:27:35
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-23 10:19:57
 * @Description: 
 */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: 'http://localhost:3088'
})
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { MemoryMessageSotre } = require('./messageStore')
const { MemoryUserStore } = require('./userStore')
const messageStore = new MemoryMessageSotre();
const userStore = new MemoryUserStore();
io.use((socket, next) => {
    const username = socket.handshake.auth.username
    console.log('no username', socket)
    if (!username) {
        return next(new Error('没有接收到昵称，程序结束！'))
    }
    const userId = randomId();
    socket.userId = userId
    socket.username = username
    next();
})

io.on('connection', (socket) => {
    console.log('socket连接成功！')
    /**添加用户 */
    userStore.setUser(socket.userId, {
        userId: socket.userId,
        username: socket.username,
        connected: true
    })

    /**返回当前用户id */
    socket.emit('userId', socket.userId)

    /**添加用户房间 */
    socket.join(socket.userId)

})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3050, () => {
    console.log('listening on *:3050');
});