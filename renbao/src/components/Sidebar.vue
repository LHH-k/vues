<template>
	<el-aside width="200px" class='scrollbar' style="z-index: 101;">
		<div style="padding-left: 20px;line-height: 55px;">
			<img src="../assets/images/logo-index.png" alt="" style="display: inline-block;vertical-align: middle;"/>
		</div>
		<div class="user">
			<div class="img-box">
				<img :src="imgUrl" alt="头像"/>
			</div>
			<div class="name">
				{{userInfo.name}}
			</div>
		</div>
		<el-menu :default-openeds="['']" :default-active="indexActive" router>
			<el-menu-item index="index" route="/">
				<i class="iconfont1 icon1-weibiaoti1"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="prudect">
				<template slot="title"><i class="iconfont1 icon1-mulu"></i>产品目录</template>
				<el-menu-item index="product-list">产品目录</el-menu-item>
				<el-menu-item index="product-1">旅游用车承运人险</el-menu-item>
			</el-submenu>
			<el-submenu index="finance">
				<template slot="title"><i class="iconfont1 icon1-liuliangyunpingtaitubiao07"></i>财务报表</template>
				<el-menu-item index="finance-1">财务管理</el-menu-item>
				<el-menu-item index="finance-2">预存款余额明细</el-menu-item>
				<el-menu-item index="finance-3">充值申请</el-menu-item>
				<el-menu-item index="finance-4">充值明细</el-menu-item>
				<el-menu-item index="finance-5">支出明细</el-menu-item>
			</el-submenu>
			<el-menu-item index="orders">
				<i class="iconfont1 icon1-dingdan"></i>
				<span slot="title">订单</span>
			</el-menu-item>
		</el-menu>
	</el-aside>
</template>
<script>
	export default{
		name:"my-aside",
		data(){
			return{
				indexActive : '',
				userInfo:{name:''},
				imgUrl : 'http://admin.jiakuaibao.com/upload/small_imgs/list-003.jpg'
			}
		},
		created(){
			let r = this.$route;
			this.indexActive = r.name;
			if(localStorage.getItem("userInfo")){				
				this.getUserInfo();	
			}else{
				setTimeout(()=>{
					this.getUserInfo();	
				},500)
			}
		},
		watch:{
    		$route(to,from){
    			
    		},
    		userInfo:function(val,oldVal){
    			console.log(val,oldVal)
    		}
    	},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		methods:{
			init(){
				
			},
			getUserInfo(){
				let userInfo = JSON.parse(localStorage.getItem("userInfo"));
				this.userInfo.name = userInfo.data.user.name;
			}
		}
	}
</script>
<style>
	.iconfont1{ vertical-align: middle; margin-right: 5px; width: 24px; text-align: center; font-size: 20px;}
	.el-aside{ color: #333;background: #fff;}
	.el-menu{background: transparent;border-right:none}
	.el-menu-item i,.el-submenu__title i{color: #333;}
	.el-submenu__title,.el-menu-item-group__title,.el-menu-item{color: #333;}
	.el-menu-item:hover i,.el-submenu__title:hover i{color: #fff;}
	.el-submenu__title:hover,.el-menu-item.is-active,.el-menu-item:focus, .el-menu-item:hover{color: #fff;background: #4890eb;}
	.el-submenu .el-menu{background: #fff;}
	.user{}
	.user .img-box{width: 100px;height: 100px;border-radius: 50%;overflow: hidden;margin: 50px auto 10px;}
	.user .img-box img{width: 100%;height: 100%;}
	.user .name{text-align: center;font-size: 18px;margin-bottom: 50px;min-height: 32px;line-height: 32px;}
</style>