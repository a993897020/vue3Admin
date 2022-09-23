/*
 * @Author: 关振俊
 * @Date: 2022-09-22 16:15:15
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 16:42:29
 * @Description: 聊天用户
 */
class MemoryUserStore {
    constructor() {
        this.userList = new Map();
    }
    setUser(userId, data) {
        this.userList.set(userId, data)
    }
    findUser(userId) {
        return this.userList.get(userId)
    }
    findAllUser() {
        return [...this.userList.values()]
    }
}
module.exports = { MemoryUserStore }
