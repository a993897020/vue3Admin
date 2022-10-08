/*
 * @Author: 关振俊
 * @Date: 2022-09-22 15:27:35
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-10-08 17:56:41
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
const fs = require('fs')
const path = require('path')

const messageStore = new MemoryMessageSotre();
const userStore = new MemoryUserStore();

/**暴露头像静态图片资源 */
app.use('/picture', express.static('./assets/avatar'))

app.get('/getAllAvatar', async (req, res) => {
    const avatarList = await fs.readdirSync(path.resolve('./assets/avatar'))
    res.send(avatarList)
})

io.use((socket, next) => {
    /**检测当前用户是否新用户 */
    const userId = socket.handshake.auth.userId
    console.log('use', userId)
    if (userId) {
        const user = userStore.findUser(userId)
        console.log('user', user)
        console.log('allUser', userStore.findAllUser())
        if (user) {
            socket.userId = user.userId
            socket.username = user.username
            socket.avatar = user.avatar
            return next()
        }
    }
    const username = socket.handshake.auth.username
    const avatar = socket.handshake.auth.avatar
    // console.log('no username', socket)
    if (!username) {
        return next(new Error('没有接收到昵称，程序结束！'))
    }
    socket.userId = randomId()
    socket.username = username
    socket.avatar = avatar
    next();
})

io.on('connection', (socket) => {
    // console.log('socket连接成功！')
    /**添加用户 */
    userStore.setUser(socket.userId, {
        userId: socket.userId,
        username: socket.username,
        avatar: socket.avatar,
        connected: true
    })
    console.log(`${socket.username}上线,id:${socket.userId}`)
    /**用户上线提示 */
    socket.broadcast.emit('online', socket.username)

    /**返回当前用户id */
    socket.emit('userId', socket.userId)

    /**添加用户房间 */
    socket.join(socket.userId)

    /**所有用户 */
    const users = []
    /**其他人的消息 */
    const messagePerUser = new Map();
    messageStore.findUserMessage(socket.userId).forEach(message => {
        if (message) {
            const { from, to } = message
            const otherUser = socket.userId === from ? to : from
            console.log({ otherUser })
            if (messagePerUser.has(otherUser)) {
                messagePerUser.get(otherUser).push(message)
            } else {
                messagePerUser.set(otherUser, [message])
            }
        }
    })
    userStore.findAllUser().forEach(user => {
        users.push({
            userId: user.userId,
            username: user.username,
            connected: user.connected,
            avatar: user.avatar,
            messages: messagePerUser.get(user.userId) || []
        })
    })
    console.log('connect', { users })
    /**返回所有用户 */
    socket.emit('users', users)

    /**返回当前用户登录 */
    socket.broadcast.emit('user connect', {
        userId: socket.userId,
        username: socket.username,
        avatar: socket.avatar,
        connected: true,
        messages: [],
    })

    /**发送消息 */
    socket.on('private message', ({ to, content, avatar, lastTime }) => {
        console.log({ to, content })
        const msgItem = {
            to,
            from: socket.userId,
            avatar,
            content,
            lastTime
        }
        socket.to(to).to(socket.userId).emit('private message', msgItem)
        messageStore.saveMessage(msgItem)
    })
    // notify users upon disconnection
    socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.userId).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
            // notify other users
            socket.broadcast.emit("user disconnected", socket.userId);
            // update the connection status of the session
            userStore.setUser(socket.userId, {
                userId: socket.userId,
                username: socket.username,
                avatar: socket.avatar,
                connected: false,
            });
            console.log(`${socket.username}下线,id:${socket.userId}`)
        }
    });
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3050, () => {
    console.log('listen to http://localhost:3050');
});