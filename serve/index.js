// 1. 搭建express服务
const express = require('express')
const app = express()
//post 请求表单使用
app.use(express.urlencoded({
    extended: true
}))

// 静态文件托管
app.use(express.static("upload"))       //可以直接访问图片  http://localhost:8989/图片名称.jpg  

// 路由
const router = require('./router')
app.use('/api', router)

app.listen(8989, () => {
    console.log('8989端口已启动...');
})
