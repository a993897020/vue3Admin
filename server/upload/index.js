/*
 * @Author: 关振俊
 * @Date: 2022-10-17 17:00:40
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-11-02 17:31:03
 * @Description: 
 */
const express = require('express')
const busboy = require('busboy')
const { randomFillSync } = require('crypto')
const fs = require('fs')
const os = require('os')
const path = require('path')
const app = express();

// const random = (() => {
//     const buf = Buffer.alloc(16);
//     return () => randomFillSync(buf).toString('hex');
// })();
/**生成文件唯一标识id */
const createFileId = () => {
    const keyStr = '0123456789abcdefghijklmnopqrstuvwxyz'
    const randomNum = () => Math.floor(Math.random() * keyStr.length)
    return ((length = 24) => Array.from({ length }, () => keyStr[randomNum()]).join(''))()
}
/**获取文件路径 */
const getFilePath = (fileId, fileName) => path.join('./fileList', `file-${fileId}-${fileName}`)
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send('hellow')
})
app.post('/upload', (req, res) => {
    /**获取请求头的参数 */
    const contentRange = req.headers['content-range']
    const fileId = req.headers['x-file-id']

    if (!contentRange) return res.status(400).json('missing request header content-range')
    if (!fileId) return res.status(400).json('missing request header x-file-id')

    const match = contentRange.match(/bytes=(\d+)-(\d+)\/(\d+)/)
    const startProgress = Number(match[1])
    const endProgress = Number(match[2])
    const fileSize = Number(match[3])

    const bb = busboy({ headers: req.headers })
    bb.on('file', (name, file, info) => {
        if (startProgress > endProgress || startProgress > fileSize || endProgress > fileSize) return res.status(400).json({ message: 'error content range' })
        const fileStat = fs.statSync(getFilePath(fileId, info.filename))
        if (Number(fileStat.size) !== startProgress) return res.status(500).json({ message: 'current chunk and server file no match' })
        const fileStream = fs.createWriteStream(getFilePath(fileId, info.filename), {
            flags: 'a'
        })
        file.pipe(fileStream)
    })
    bb.on('finish', () => {
        res.status(200).json({ message: 'upload success' })
    })
    bb.on('error', () => {
        res.status(500).json({ message: 'upload failed' })
    })
    req.pipe(bb)
    // const bb = busboy({ headers: req.headers })
    // bb.on('file', async (name, file, info) => {
    //     const { filename, encoding, mimeType } = info;
    //     console.log({ name, file, info })
    //     console.log(
    //         `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
    //         filename,
    //         encoding,
    //         mimeType
    //     );
    //     const suffix = filename.split('.')[filename.split('.').length - 1]
    //     const saveTo = path.join('./fileList/', `${random()}.${suffix}`);
    //     const fileStream = fs.createWriteStream(saveTo) //创建一个可写的流文件，异步处理，不会堵塞主进程
    //     file.pipe(fileStream); // 把file覆盖到fileStream中
    //     file.on('data', (data) => {
    //         console.log(`File [${name}] got ${data.length} bytes`);
    //     }).on('close', () => {
    //         console.log(`File [${name}] done`);
    //     });
    //     fileStream.on('ready', () => {
    //         console.log('文件已为写入准备好', fileStream.pending)
    //         const fileStat = fs.statSync(saveTo)
    //         console.log({ fileStream, fileStat })
    //     })
    // })
    // bb.on('field', (name, val, info) => {
    //     console.log(`Field [${name}]: value: %j`, val, info);
    // });
    // bb.on('close', () => {
    //     console.log('Done parsing form!');
    //     res.writeHead(303, { Connection: 'close', Location: '/' });
    //     res.end();
    // });
    // req.pipe(bb);
})
/**初始化文件，给上传的文件创建一个唯一标识fileId和一个可写的流 */
app.post('/initUpload', (req, res) => {
    if (!req.body || !req.body.fileName) {
        res.status(400).json({ message: 'fileName不能为空！' })
    }
    const fileId = createFileId()
    fs.createWriteStream(getFilePath(fileId, req.body.fileName), {
        flags: 'w'
    })
    res.status(200).json({ fileId })
})
/**获取当前文件状态：用于断点续传 */
app.get('/uploadStatus', (req, res) => {
    // console.log(req)
    console.log(req.query)
    if (!req.query.fileId) return res.status(400).json({ message: 'fileId is not a found!' })
    if (!req.query.fileName) return res.status(400).json({ message: 'fileName is not a found!' })
    const fileStat = fs.statSync(getFilePath(req.query.fileId, req.query.fileName))
    res.status(200).send({ fileId: req.query.fileId, fileSize: fileStat.size, fileName: req.query.fileName })
})

app.listen(3050, () => {
    console.log('listen to http:localhost:3050');
})