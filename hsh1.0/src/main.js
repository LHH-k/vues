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

import BASE_URL from './constants';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data:{
    userPhone:'',
    userStatus:0,
  },
  created(){
    // console.log('main.js运行')
    if(hsh.isAppNew()){
      hsh.getTokenNew(function(responssData){
        console.log(responssData.token);
      })
    }
    //获取手机号
    setTimeout(()=>{
      this.userPhone = 15267207881;
      localStorage.setItem('phone',this.userPhone);
      if(localStorage.getItem('tokens')){
        this.getStar();
      }else{
        let times = setInterval(()=>{
          if(localStorage.getItem('tokens')){
            clearInterval(times);
            this.getStar();
          }
        },50)
      }
    },10)
    
  },
  methods:{
    //获取和星级
    getStar(){
      this.$http.post(`${BASE_URL}/fnw/get/hsh/userLv`,{mobile:this.userPhone}).then((res)=>{
        this.userStatus = res.data.Status;
        localStorage.setItem('status',this.userStatus);
      })
    }
  }
})
