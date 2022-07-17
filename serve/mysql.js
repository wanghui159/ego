//连接数据库
//引入mysql
const mysql = require('mysql');

//创建数据库连接
const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vue-ego',
    // port:''  --默认是3306
});

// 封装数据库操作语句 sql语句
//创建连接方法
//sql语句
//arr参数
//callback成功回调函数

function sqlFn(sql, arr, callback) {
    client.query(sql, arr, (error, result) => {
        if (error) {  //如果连接失败，返回失败原因
            console.log(error);
            return
        }
        callback(result);   //连接成功，执行回调函数
    })
}

module.exports = sqlFn