import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Axios from 'axios'
import BASE_URL from '../constants'


var routes = [
    // 产品列表
    {
      path: '/home',
      name: 'home',
      component:() => import('@/components/Home'),
      meta: {title:'蜂鸟窝',requireAuth:true},
    },
    // 产品详情
    {
      path: '/listInfo/:type',
      name: 'listInfo',
      component:() => import('@/components/ListInfo'),
      meta: {title:'产品详情',requireAuth:true},
    },
    // 已购买服务
    {
      path: '/myBuy',
      name: 'myBuy',
      component:() => import('@/components/MyBuy'),
      meta: {title:'已购买服务',requireAuth:true},
    },
    // 我的
    {
      path: '/myIndex',
      name: 'myIndex',
      component:() => import('@/components/MyIndex'),
      meta: {title:'我的',requireAuth:true},
    },
    //呼叫服务
    {
      path: '/callService/:type',
      name: 'callService',
      component:() => import('@/components/CallService'),
      meta: {title:'呼叫服务',requireAuth:true},
    },
    //用户协议
    {
      path: '/fnwtext',
      name: 'fnwtext',
      component:() => import('@/components/Fnwtext'),
      meta: {title:'用户协议',requireAuth:true},
    },
    // 购买之前用户信息填写
    {
      path: '/buy_before/:type',
      name: 'buy_before',
      component:() => import('@/components/Buy_before'),
      meta: {title:'购买服务',requireAuth:true},
    },
    // 支付页
    {
      path: '/pay/:type',
      name: 'pay',
      component:() => import('@/components/Pay'),
      meta: {title:'支付',requireAuth:true},
    },
    // 成功页面
    {
      path: '/success/:type',
      name: 'success',
      component:() => import('@/components/Success'),
      meta: {title:'成功',requireAuth:true},
    },
    // 我的服务
    {
      path: '/userService',
      name: 'userService',
      component:() => import('@/components/UserService'),
      meta: {title:'我的服务',requireAuth:true},
    },
    //用户确认
    {
      path: '/userConfirm',
      name: 'userConfirm',
      component:() => import('@/components/UserConfirm'),
      meta: {title:'确认服务信息',requireAuth:true},
    },
    // 地址选择
    {
      path: '/addSelect/:type',
      name: 'addSelect',
      component:() => import('@/components/AddSelect'),
      meta: {title:'常用服务信息选择',requireAuth:true},
    },
    //未支付订单
    {
      path: '/order_unpaid',
      name: 'order_unpaid',
      component:() => import('@/components/Order_unpaid'),
      meta: {title:'未支付订单',requireAuth:true},
    },
    //已购买订单
    {
      path: '/order_buy',
      name: 'order_buy',
      component:() => import('@/components/Order_buy'),
      meta: {title:'已购买订单',requireAuth:true},
    },
    //历史服务
    {
      path: '/order_used',
      name: 'order_used',
      component:() => import('@/components/Order_used'),
      meta: {title:'历史服务',requireAuth:true},
    },
    //评价
    {
      path: '/rate',
      name: 'rate',
      component:() => import('@/components/Rate'),
      meta: {title:'服务评价',requireAuth:true},
    },
    //info360 360维修价格参考表
    {
      path: '/info360',
      name: 'info360',
      component:() => import('@/components/info360'),
      meta: {title:'家电维修价格参考表'},
    },
    
    {
      path: '*',
      redirect: {name: 'home'},
    }
    //**************** 临时添加**************************
]

const router = new Router({
  // mode:'history',
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title;
  }
  if(to.meta.requireAuth){    
    //每个页面都请求用户信息 验证token是否过期
    // console.log('router运行')
    let hasToken = localStorage.getItem('tokens');
    if(!hasToken){
      // 登录先获取token
      Axios.get(BASE_URL + '/fnwToken').then((res)=>{
        localStorage.setItem("tokens",JSON.stringify(res.data));
      })
    }else{
      let t = JSON.parse(localStorage.getItem('tokens')).expire * 1000;
      let now_t = new Date().getTime();
      if(t <= now_t){
        //tokens过期了
        Axios.get(BASE_URL + '/fnwToken').then((res)=>{
          localStorage.setItem("tokens",JSON.stringify(res.data));
        })
      }
    }
  }
  next();
})

export default router;