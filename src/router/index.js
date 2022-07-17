// import { hasOwnMetadata } from 'core-js/fn/reflect'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/Login.vue'
import Home from '../views/Home/Home.vue'
import store from '../store/index'
// 异步
const Goods = () => import('../views/Goods/Goods.vue')
const Params = () => import('../views/Params/Params.vue')
const User = () => import('../views/User/User.vue')
const Order = () => import('../views/Order/Order.vue')
const orderList = () => import('../views/Order/orderList/orderList.vue')
const orderBack = () => import('../views/Order/orderBack/orderBack.vue')

const addGoods = () => import('../views/Goods/addGoods.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Layout',
    component: Layout,
    //  路由元信息 
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/add-goods',
        name: 'addGoods',
        component: addGoods
      },
      {
        path: '/params',
        name: 'Params',
        component: Params
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        redirect: '/order/order-list',
        children: [
          {
            path: 'order-list',
            name: 'order-List',
            component: orderList
          },
          {
            path: 'order-back',
            name: 'order-Back',
            component: orderBack
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})


/**
 * 路由拦截
 */
router.beforeEach((to, from, next) => {
  // 1. 判断是否需要登陆
  if (to.matched.some(record => record.meta.isLogin)) {
    // 2. 判断是否已经登录
    console.log('store.state', store.state);
    let token = store.state.loginModule.userinfo.token
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
