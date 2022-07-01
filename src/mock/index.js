/*
 * @Author: 关振俊
 * @Date: 2022-06-28 11:49:46
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-06-28 11:53:56
 * @Description: mock数据
 */
const Mock = require('mockjs')

var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
console.log(data)
console.log(JSON.stringify(data, null, 4))
