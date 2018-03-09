<template>
	<el-header style="height: 55px;line-height: 55px; text-align: right;" class="bottom-shadow">
      	<!--<el-breadcrumb separator-class="el-icon-arrow-right">
		  	<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-19"></i>首页</el-breadcrumb-item>
		  	<el-breadcrumb-item v-for="(item,index) in navs" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>-->
      	<span style="cursor: pointer;" @click="backLogin"><i class="iconfont icon-kaiguan"></i>退出</span>
    </el-header>
</template>
<script>
	import router from '../router'
	export default{
		name:"my-header",
		data(){
			return{
				navs:[],
			}
		},
		created(){
			this.getData(this.$route);		//第一次进页面获取当前路由
		},
		mounted(){
	  		this.init();
		},
		watch:{
    		$route(to,from){
    			this.getData(to);
    		}
    	},
		methods:{
			init(){
				
			},
			getData(to){
//				switch(to.name){
//					case "index" : this.navs = [];
//						break;
//					case "room-1" : this.navs = ['房源中心','房间管理'];
//						break;
//					case 'unfind' : this.navs = ['404'];
//						break;
//				}
			},
			backLogin(){
				localStorage.removeItem("tokens");
				localStorage.removeItem("userInfo");
				router.replace("/login/");
			},
		}
	}
</script>
<style>
	.el-header{ background-color: #ffffff; color: #333; line-height: 45px;z-index: 100;}
	.el-breadcrumb{line-height:inherit;}
</style>