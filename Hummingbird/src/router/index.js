import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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
				path:'register',
				name:"register",
				components:{appView : () => import('@/components/Register')},
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



export default router;