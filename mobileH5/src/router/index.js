import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/home',
      name: 'home',
      component:() => import('@/components/Home'),
    },
    // 我的主页
    {
      path: '/myIndex',
      name: 'myIndex',
      component:() => import('@/components/MyIndex'),
    },
    //呼叫服务
    {
      path: '/callService/:type',
      name: 'callService',
      component:() => import('@/components/CallService'),
    },
    //用户协议
    {
      path: '/fnwtext',
      name: 'fnwtext',
      component:() => import('@/components/Fnwtext'),
    },
    // 购买页
    {
      path: '/buy_p/:type',
      name: 'buy_p',
      component:() => import('@/components/Buy_p'),
    },
    // 购买360确认
    {
      path: '/buy_360',
      name: 'buy_360',
      component:() => import('@/components/Buy_360'),
    },
    // 支付页
    {
      path: '/pay/:type',
      name: 'pay',
      component:() => import('@/components/Pay'),
    },
    // 成功页面
    {
      path: '/success/:type',
      name: 'success',
      component:() => import('@/components/Success'),
    },
    {
      path: '*',
      redirect: {name: 'home'},
    }
  ]
})
 