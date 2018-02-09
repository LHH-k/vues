<template>
	<el-header style="height: 45px; text-align: right;" class="bottom-shadow">
      	<el-breadcrumb separator-class="el-icon-arrow-right">
		  	<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-19"></i>首页</el-breadcrumb-item>
		  	<el-breadcrumb-item v-for="(item,index) in navs" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
      	<span style="float: right;margin-top: -45px;cursor: pointer;"><i class="iconfont icon-kaiguan"></i>退出</span>
    </el-header>
</template>
<script>
	export default{
		name:"my-header",
		data(){
			return{
				navs:[],
			}
		},
		created(){
			this.getDate(this.$route);
		},
		mounted(){
	  		this.init();
		},
		watch:{
    		$route(to,from){
    			this.getDate(to);
    		}
    	},
		methods:{
			init(){
				
			},
			getDate(to){
//				console.log(to)
				switch(to.name){
					case "index" : this.navs = [];
						break;
					case "room-1" : this.navs = ['房源中心','房间管理'];
						break;
					case "room-2" : this.navs = ['房源中心','业主管理'];
						break;
					case "room-3" : this.navs = ['房源中心','短信催缴'];
						break;
					case 'finance-1' : this.navs = ['财务管理','财务汇总'];
						break;
					case 'finance-2' : this.navs = ['财务管理','财务流水'];
						break;
					case 'finance-3' : this.navs = ['财务管理','财务类别'];
						break;
					case 'sheet-1' : this.navs = ['报表中心','房间配置报表'];
						break;
					case 'sheet-2' : this.navs = ['报表中心','租客信息报表'];
						break;
					case 'sheet-3' : this.navs = ['报表中心','合约信息报表'];
						break;
					case 'sheet-4' : this.navs = ['报表中心','出租信息报表'];
						break;
					case 'sheet-5' : this.navs = ['报表中心','收租信息报表'];
						break;
					case 'unfind' : this.navs = ['404'];
						break;
				}
			}
		}
	}
</script>
<style>
	.el-header{ background-color: #ffffff; color: #333; line-height: 45px;z-index: 100;}
	.el-breadcrumb{line-height:inherit;}
</style>