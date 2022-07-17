/**
 * 请求的方法
 * 
 */
import axios from 'axios'
import base from './base'
// nose.js
const qs = require('qs')

const api = {
    /**
     * 登录
    */
    getLogin(params) {  //params:{username:'',password:''}
        return axios.post(base.login, qs.stringify(params))
    },

    /**
     * 商品列表
     */
    getGoodList(params) {
        return axios.get(base.goodsList, {
            params  // page:xx
        })
    },
    /**
     * 商品搜索
     */
    getSearchList(params) {
        return axios.get(base.search, {
            params  // search:xx;page:xx
        })
    },

    /**
     * 获取商品类别
     */

    getSelectItmeCategoryById(params) {
        return axios.get(base.selectItmeCategoryById, {
            params     //  id:xx
        })
    },

    /**
     * 添加图片
     */
    insertGoods(params) {
        return axios.get(base.insertGoods, {
            params     //  {}
        })
    },
    /**
     * 删除图片
     */
    deleteGoodsById(params) {
        return axios.get(base.deleteGoodsById, {
            params  //id=xx
        })
    },
    /**
     * 编辑商品
     */
    updateGoodsById(params) {
        return axios.get(base.updateGoods, {
            params  //{}
        })
    },

    /**
     * 模拟数据
     */
    getStatistical() {
        return axios.get(base.statistical)
    },
    getStatisticalecharts() {
        return axios.get(base.statisticalecharts)
    },

    /**
     * 规格参数
     */
    getParams(params) {
        return axios.get(base.params, {
            params
        })
    },
    getParamsSearch(params) {
        return axios.get(base.paramsSearch, {
            params
        })
    },
    insertItemParam(params) {
        return axios.get(base.insertItemParam, {
            params
        })
    },
    deleteParams(params) {
        return axios.get(base.deleteParams, {
            params
        })
    }
}

export default api