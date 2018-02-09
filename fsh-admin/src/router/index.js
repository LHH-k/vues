import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes:[
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
					//meta: {
					//	requireAuth: true//用于判断是否需要登陆才能访问该模块 true表示需要
					//},
					children:[
						{
							path:'',
							name:'index',
							component:() => import('@/components/Index')
						},
						//房源中心
						{
							path:'room-1',
							name:'room-1',
							component:() => import('@/components/Room-1')
						},
						{
							path:'room-2',
							name:'room-2',
							component:() => import('@/components/Room-2')
						},
						{
							path:'room-3',
							name:'room-3',
							component:() => import('@/components/Room-3')
						},
						//财务管理
						{
							path:'finance-1',
							name:'finance-1',
							component:() => import('@/components/Finance-1')
						},
						{
							path:'finance-2',
							name:'finance-2',
							component:() => import('@/components/Finance-2')
						},
						{
							path:'finance-3',
							name:'finance-3',
							component:() => import('@/components/Finance-3')
						},
						//报表中心
						{
							path:'sheet-1',
							name:'sheet-1',
							component:() => import('@/components/Sheet-1')
						},
						{
							path:'sheet-2',
							name:'sheet-2',
							component:() => import('@/components/Sheet-2')
						},
						{
							path:'sheet-3',
							name:'sheet-3',
							component:() => import('@/components/Sheet-3')
						},
						{
							path:'sheet-4',
							name:'sheet-4',
							component:() => import('@/components/Sheet-4')
						},
						{
							path:'sheet-5',
							name:'sheet-5',
							component:() => import('@/components/Sheet-5')
						},
						//404页面没找到
						{
					      	path: '*',
					      	name: 'unfind',
					      	component:() => import('@/components/404')
					    }
					]
				},
				{
					path:'login',
					name:"login",
					components:{appView : () => import('@/components/Login')}
				},
				
			]
		},
	]
})
