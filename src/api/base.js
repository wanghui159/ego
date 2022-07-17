/**
 * 接口路径配置：
 * 一般文件目录:base.js  index.js
 * 或许：
 *  config
 *      login 
 *          login.js  
 */

const base = {
    host: 'http://localhost:8989/',  // 基础域名
    goodsList: '/api/api/projectList',  //商品列表
    search: '/api/api/search',  // 商品搜索
    selectItmeCategoryById: '/api/api/selectItmeCategoryById',
    uploadUrl: '/api/api/upload',  // 图片上传
    insertGoods: '/api/api/insertGoods', //添加图片'
    deleteGoodsById: '/api/api/deleteGoodsById', // 删除shangpin
    updateGoods: '/api/api/updateGoods',  // 编辑商品
    login: '/api/api/login',
    statistical: '/api/api/statistical',
    statisticalecharts: '/api/api/statisticalecharts',
    params: '/api/api/backend/itemParam/selectItemParamAll',
    paramsSearch: '/api/api/params/search',
    insertItemParam: '/api/api/backend/itemParam/insertItemParam',  //规格参数添加
    deleteParams: '/api/api//params/delete' //删除规格参数
}

export default base