// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//vant
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
//axios
import axios from './http'
Vue.prototype.$http=axios; 
//自定义的js和css
import MyPlugin from './commonJS'
Vue.use(MyPlugin);
import './css/animate.css'
import './css/my-vant.css'
//全局过滤器
import "./filters";
//路由
import router from './router';
//按需引入element-ui
import { Rate } from 'element-ui';
Vue.use(Rate);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data:{
    userPhone:'',
  },
  created(){
    // 获取微信的openid
    this.$http.post(`http://wx.funlifeday.com/web/wechat/user/get/userInfo`).then((res)=>{
      if(res.data.res){
        this.userPhone = res.data.data.openid; //这个phone是openid
        localStorage.setItem('phone',this.userPhone);
      }
    })
  },
})
