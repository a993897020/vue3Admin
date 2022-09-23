/*
 * @Author: 关振俊
 * @Date: 2022-09-22 16:10:59
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 17:02:14
 * @Description: 聊天消息存储
 */
class MemoryMessageSotre {
    constructor() {
        this.messageList = []
    }
    saveMessage(msg) {
        this.messageList.push(msg)
    }
    findUserMessage(userId) {
        return this.messageList.filter(({ from, to }) => from === userId || to === userId)
    }
}
module.exports = { MemoryMessageSotre }