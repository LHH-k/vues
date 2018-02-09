import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios';

import {GETUSERINFO} from '../constants';

const routes = [
	{
		path:'/',
		name:"app",
		components : {appView: () => import('../App')},
		redirect: {name: 'home'},
		children:[
			{
				path:'home',
				name:'home',
				components:{appView : () => import('@/components/Home')},
				redirect: {name: 'index'},
				meta: {
					requireAuth: true//用于判断是否需要登陆才能访问该模块 true表示需要
				},
				children:[
					{
						path:'',
						name:'index',
						component:() => import('@/components/Index'),
						meta: {requireAuth: true},
					},
					//产品
						//产品列表
					{
						path:'product-list',
						name:'product-list',
						component:() => import('@/components/Product-list'),
						meta: {requireAuth: true},
					},
						//承运人
					{
						path:'product-1',
						name:'product-1',
						component:() => import('@/components/Product-1'),
						meta: {requireAuth: true},
					},
					//订单
					{
						path:'orders',
						name:'orders',
						component:() => import('@/components/Orders'),
						meta: {requireAuth: true},
					},
					//财务
					{
						path:'finance-1',
						name:'finance-1',
						component:() => import('@/components/Finance-1'),
						meta: {requireAuth: true},
					},
						//财务-预存款余额明细
					{
						path:'finance-2',
						name:'finance-2',
						component:() => import('@/components/Finance-2'),
						meta: {requireAuth: true},
					},
						//财务-充值申请
					{
						path:'finance-3',
						name:'finance-3',
						component:() => import('@/components/Finance-3'),
						meta: {requireAuth: true},
					},
						//财务-充值明细
					{
						path:'finance-4',
						name:'finance-4',
						component:() => import('@/components/Finance-4'),
						meta: {requireAuth: true},
					},
						//财务-支出明细
					{
						path:'finance-5',
						name:'finance-5',
						component:() => import('@/components/Finance-5'),
						meta: {requireAuth: true},
					},
					//404页面没找到
					{
				      	path: '*',
				      	name: 'unfind',
				      	component:() => import('@/components/404'),
						meta: {requireAuth: true},
				    }
				]
			},
			{
				path:'login',
				name:"login",
				components:{appView : () => import('@/components/Login')},
				meta: {requireAuth: false},
			},
			{
		      	path: '*',
		      	redirect: {name:'home'},
		    }
			
		]
	},
]

const router = new VueRouter({
    routes
});

//router.beforeEach((to, from, next) => {
//	console.log(to,from,next);
//	if(to.meta.requireAuth){
//		const token = JSON.parse(localStorage.getItem("tokens"));
//		if(token){
//			const AUTH_TOKEN = token.token_type+' '+token.access_token;
//			axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//  		axios.get(GETUSERINFO)
//			  .then(function (res) {
//			    localStorage.setItem("userInfo",JSON.stringify(res));
//			    if(from.name == "login" && from.query.redirect){
//			    	next(from.query.redirect);
//			    }else{			    	
//			    	next();
//			    }
//			  })
//			  .catch(function (error){
//			  	if(to.name === 'login'){
//			  		next()
//			  	}else{			  		
//			  		next('/login/');
//			  	}
//			    localStorage.removeItem("tokens");
//			    localStorage.removeItem("userInfo");
//			  });
//		}else{
//			if(to.name === 'login'){
//		  		next()
//		  	}else{			  		
//		  		next({
//					path:'/login/',
//					query: {redirect: to.fullPath}
//				});
//		  	}
//		}
//	}else{
//		next();
//	}
//})


export default router;