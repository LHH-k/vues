// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'		//element-ui的css需要单独引入
import './css/animate.css' 											//动画

import App from './App'
//动画

Vue.use(ElementUI)

Vue.config.productionTip = false
//重新绑定
Vue.prototype.$http = axios

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
    $route(to,from){
//  	console.log(to,from);
//    if(from.path !== '/'){
//      if(to.name === 'login'){
//        this.$router.go(0);
//      }
//    }
    },
  }
})
