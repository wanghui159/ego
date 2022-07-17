const express = require('express')
const router = express.Router()
// 导入数据库 sqlFun('sql',[],res=>{})
const sqlFn = require('./mysql')
// 图片所需要的模块
const fs = require('fs')
const multer = require('multer')
// 导入模块jsonwebtoken   密钥
const jwt = require('jsonwebtoken')
const config = require('./serect')
// config.jwtSecert 密钥
// 路由借口

// 导入mock模块
const Mock = require('mockjs')
/**
 * 商品列表：获取分页{total:'',arr:[{},{},{}],pagesize:8}
 * 参数：page  页码
 */


/**
 * 登录
 * {username,password}
 */
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //创建sql语句
    const sql = 'select * from user where username=? and password=?'
    //arr参数
    const arr = [username, password]
    //调用数据库查询方法
    sqlFn(sql, arr, (result) => {
        console.log('username-password', username, password);
        if (result.length > 0) {    //查询到表示登录成功
            //生成登录状态token
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token,      //把生成的token返回
                msg: '登录成功'
            })
        } else {                  //没查询到，表示登录失败
            res.send({
                status: 400,
                msg: '用户名密码错误'
            })
        }
    })

})

router.get('/projectList', (req, res) => {
    //参数 page 页数
    var page = req.query.page || 1;     //get请求，参数page，默认值为1
    const sqlLen = " select * from project where id "
    //sql语句
    /**
     *  order by id desc:根据id倒序    
     *  limit 10:拿10条数据
     * offset ：偏移量，如果page=2，从10开始拿10条数据
    */
    // var sql = 'select * from project order by id desc limit 10 offset ' + (page - 1) * 10;
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 'select * from project order by id desc limit 8 offset ' + (page - 1) * 8

        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                });
            } else {
                res.send({
                    status: 500,
                    msg: '暂无数据'
                })
            }
        })

    })

})

//商品模糊搜索接口
/**
 * 商品查询借口 search
 */
router.get('/search', (req, res) => {
    var page = req.query.page || 1;     //get请求，参数page，默认值为1
    const search = req.query.search;
    //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
    // order by id desc ; 搜索到的数据倒叙
    console.log('page-server-router', page);
    console.log('search-server-router', search);
    const sqlLen = 'select * from project where concat(`title`, `sellPoint`, `descs`) like "%' + search + '%"'
    const sql = 'select * from project where concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"' + ' order by id desc limit 8 offset ' + (page - 1) * 8;
    sqlFn(sqlLen, null, (data) => {
        let len = data.length
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                console.log('result.length>0')
                res.send({
                    status: 200,
                    total: len,
                    pageSize: 8,
                    result
                })
            } else {
                console.log('result.length<0')
                res.send({
                    status: 400,
                    msg: '暂无数据'
                })
            }
        })
    })

})

/**
 * 类目选择
 */
router.get('/selectItmeCategoryById', (req, res) => {

    const id = req.query.id || 1;
    const sql = 'select * from status where id=?';
    const arr = [id]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 400,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 上传图片  post请求  upload
 * 说明：
 * 1. 后台安装multer模块  同时引入fs模块
 * 2. router.js 入口文件导入模块
 *          const fs = require('fs')
 *          const multer = require('multer')
 * 3. 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});


/**
 * 添加商品
 */
router.get('/insertGoods', (req, res) => {
    var title = req.query.title || "";
    var cid = req.query.cid || "";
    var sellPoint = req.query.sellPoint || "";
    var price = req.query.price || "";
    var num = req.query.num || "";
    var descs = req.query.descs || "";
    var status = req.query.status || "";
    var image = req.query.image || "";

    const sql = "insert into project values (null,?,?,?,?,?,?,'',?,'','',?)";
    var arr = [title, image, sellPoint, price, cid, num, status, descs];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {  //影响行数
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 * 删除商品
 */
router.get('/deleteGoodsById', (req, res) => {
    var id = req.query.id;
    var arr = [id];
    var sql = 'delete from project where id=?';
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) { //影响行数大于0
            res.send({
                status: 200,
                result,
                msg: "删除成功！"
            })
        } else {
            res.send({
                status: 400,
                msg: '删除失败！'
            })
        }
    })
})


/**
 * 编辑商品
 */
router.get('/updateGoods', (req, res) => {
    var id = req.query.id;
    var title = req.query.title || "";
    var sellPoint = req.query.sellPoint || "";
    var price = req.query.price || "";
    var num = req.query.num || "";
    var desc = req.query.desc || "";
    var status = req.query.status || "";
    var image = req.query.image || "";
    var cid = req.query.cid;
    var sql = "update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,status=?,image=? where id=?";
    sqlFn(sql, [title, sellPoint, cid, price, num, desc, status, image, id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '修改成功'
            })
        } else {
            res.send({
                status: 200,
                msg: '修改失败'
            })
        }
    })
})


/**
 * mock --模拟数据
 */
router.get('/statistical', (req, res) => {
    res.send(
        JSON.stringify(Mock.mock({
            success: true,
            status: 200,
            "list|4": [
                {
                    "id+1": 001,
                    "title|+1": ['总销售额', '访问量', '支付总量', '收藏量'],
                    "current|0-2000": 100,
                    "total|10000-999999": 200
                }
            ]
        }))
    )
})

router.get('/statisticalecharts', (req, res) => {
    res.send(
        JSON.stringify(Mock.mock({
            success: true,
            status: 200,
            data: {
                "furniture|6": [
                    {
                        "date|+1": ['2021/6', '2021/7', '2021/8', '2021/9', '2021/10', '2021/11'],
                        "num|0-1000": 100,
                    }
                ],
                "iphone|6": [
                    {
                        "date|+1": ['2021/6', '2021/7', '2021/8', '2021/9', '2021/10', '2021/11'],
                        "num|0-1000": 100,
                    }
                ],
                "appliances|6": [
                    {
                        "date|+1": ['2021/6', '2021/7', '2021/8', '2021/9', '2021/10', '2021/11'],
                        "num|0-1000": 100,
                    }
                ]
            },

        }))
    )
})

/**
 * 规格参数
 */

//规格参数的请求
router.get('/backend/itemParam/selectItemParamAll', (req, res) => {
    var page = req.query.page || 1;
    let sqlLen = 'select * from params';
    var sql = 'select * from params  order by id desc limit 8 offset ' + (page - 1) * 8;
    sqlFn(sqlLen, null, data => {
        let total = data.length
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    result,
                    total: total,
                })
            } else {
                res.send({
                    status: 400,
                    msg: '暂无数据'
                })
            }
        })
    })


})

//规格参数模糊搜索接口
router.get('/params/search', (req, res) => {
    var page = req.query.page || 1;
    const search = req.query.search;
    //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
    // order by id desc ; 搜索到的数据倒叙
    //limit 10 offset ' + (page-1)*10;  根据给的偏移量page只显示10条数据，page=1，就是1-10；page=2，就是11-20
    const sql = 'select * from params where concat(`id`,`itemCatId`,`paramData`,`specsName`) like "%' + search + '%"' + ' order by id desc limit 8 offset ' + (page - 1) * 8;
    const sqlLen = 'select * from params where concat(`id`,`itemCatId`,`paramData`,`specsName`) like "%' + search + '%"'
    sqlFn(sqlLen, null, data => {
        let total = data.length
        sqlFn(sql, [search, page], result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    result,
                    total,
                    pageSize: 8,
                })
            } else {
                res.send({
                    status: 400,
                    msg: '暂无数据'
                })
            }
        })
    })


})

//添加规格参数接口
router.get("/backend/itemParam/insertItemParam", (req, res) => {
    var itemCatId = req.query.itemCatId;
    var paramData = req.query.content;
    var specsName = req.query.specsName
    console.log('paramData', paramData);
    sql = 'insert into params values(null,?,?,?)'
    sqlFn(sql, [itemCatId, paramData, specsName], result => {
        console.log(sql);
        if (result.affectedRows > 0) {  //影响行数大于0
            res.send({
                status: 200,
                result,
                msg: '添加成功！'
            })
        } else {
            res.send({
                status: 400,
                msg: '添加失败！'
            })
        }
    })
})

//删除规格参数
router.get('/params/delete', (req, res) => {
    var id = req.query.id;
    var sql = 'delete from params where id=?';
    sqlFn(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功！'
            })
        } else {
            res.send({
                status: 400,
                msg: '删除失败！'
            })
        }
    })
})


module.exports = router