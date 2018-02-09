<template>
	<el-aside width="200px" class='scrollbar'>
		<div class="user">
			<div class="img-box">
				<img :src="imgUrl" alt="头像"/>
			</div>
			<div class="name">
				巴啦啦小魔仙
			</div>
		</div>
		<el-menu :default-openeds="['']" :default-active="indexActive" router>
			<el-submenu index="room">
				<template slot="title"><i class="iconfont icon-fangyuan"></i>房源中心</template>
				<el-menu-item index="room-1"><i class="el-icon-caret-right"></i>房间管理</el-menu-item>
				<el-menu-item index="room-2"><i class="el-icon-caret-right"></i>业主管理</el-menu-item>
				<el-menu-item index="room-3"><i class="el-icon-caret-right"></i>短信催缴</el-menu-item>
				<!--<el-submenu index="2-4">
					<template slot="title">选项4</template>
					<el-menu-item index="2-4-1">选项4-1</el-menu-item>
				</el-submenu>-->
			</el-submenu>
			<el-submenu index="finance">
				<template slot="title"><i class="el-icon-menu"></i>财务管理</template>
				<el-menu-item index="finance-1"><i class="el-icon-caret-right"></i>财务汇总</el-menu-item>
				<el-menu-item index="finance-2"><i class="el-icon-caret-right"></i>财务流水</el-menu-item>
				<el-menu-item index="finance-3"><i class="el-icon-caret-right"></i>财务类别</el-menu-item>
			</el-submenu>
			<el-submenu index="sheet">
				<template slot="title"><i class="el-icon-setting"></i>报表中心</template>
				<el-menu-item index="sheet-1"><i class="el-icon-caret-right"></i>房间配置报表</el-menu-item>
				<el-menu-item index="sheet-2"><i class="el-icon-caret-right"></i>租客信息报表</el-menu-item>
				<el-menu-item index="sheet-3"><i class="el-icon-caret-right"></i>合约信息报表</el-menu-item>
				<el-menu-item index="sheet-4"><i class="el-icon-caret-right"></i>出租信息表报</el-menu-item>
				<el-menu-item index="sheet-5"><i class="el-icon-caret-right"></i>收租记录报表</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>
<script>
	export default{
		name:"my-aside",
		data(){
			return{
				indexActive : '',
				imgUrl : 'http://admin.jiakuaibao.com/upload/small_imgs/list-003.jpg'
			}
		},
		created(){
			var r = this.$route;
			this.indexActive = r.name;
		},
		watch:{
    		$route(to,from){
    			this.getDate(to);
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
			getDate(to){
				
			}
		}
	}
</script>
<style>
	.iconfont{ vertical-align: middle; margin-right: 5px; width: 24px; text-align: center; font-size: 18px;}
	.el-aside{ color: #fff;background: #4b4a48;}
	.el-menu{background: transparent;border-right:none}
	.el-menu-item i,.el-submenu__title i{color: #fff;}
	.el-submenu__title,.el-menu-item-group__title,.el-menu-item{color: #fff;}
	.el-submenu__title:hover,.el-menu-item.is-active,.el-menu-item:focus, .el-menu-item:hover{color: #fff;background: #4890eb;}
	.el-submenu{border-top: 1px solid #454241;}
	.el-submenu .el-menu{background: #444241;}
	.el-submenu .el-menu-item{padding-left: 30px !important;}
	.user{}
	.user .img-box{width: 100px;height: 100px;border-radius: 50%;border:3px solid #b1b0b0;overflow: hidden;margin: 50px auto 10px;}
	.user .img-box img{width: 100%;height: 100%;}
	.user .name{text-align: center;font-size: 16px;margin-bottom: 50px;}
</style>