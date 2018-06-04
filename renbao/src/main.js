// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from './http'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'		//element-ui的css需要单独引入
import './css/animate.css' 											//动画

import App from './App'

//// 引用API文件
//import api from './api/index.js'
//// 将API方法绑定到全局
//Vue.prototype.$api = api

Vue.use(ElementUI)

Vue.config.productionTip = false
//重新绑定
Vue.prototype.$http = axios;

import {GETUSERINFO} from './constants';
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App },
  data:{
  	linkTo:{},
  	linkfrom:{},
  },
  watch:{
    $route(to,from,next){
//  	console.log(to,from)
    	if(to.meta.requireAuth){    
    		//每个页面都请求用户信息 验证token是否过期
    		this.$http.get(GETUSERINFO).then(function (res) {
			    localStorage.setItem("userInfo",JSON.stringify(res));
			    if(from.query.redirect || from.name != 'login'){
				    router.replace({
	    				name:from.query.redirect,
	    			})
			    }
			 	}).catch(function (error){
				  	localStorage.removeItem("tokens");
				    localStorage.removeItem("userInfo");
				    let redirect_name = from.name;
				    if(redirect_name !== 'login'){				    	
				    	router.replace({
				    	    name: 'login',
				    	    query: {redirect: redirect_name},
				    	    params: { error : '登陆信息已过期，请重新登陆！' }
				    	})
				    }else{
				    	router.replace({
				    	    name: 'login',
				    	    params: { error : '登陆信息已过期，请重新登陆！' }
				    	})
				    }
			  });
    	}
    },
  }
})
