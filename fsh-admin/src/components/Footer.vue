<template>
	<el-footer style="height: 41px;line-height: 40px;border-top: 1px solid #ccc;color: #999;">
      	<el-row>
      		<el-col :span="16">© 泛生活长租公寓平台</el-col>
      		<el-col :span="8" style="text-align: right;text-align: right;">服务热线：400-8084-989 <i class="el-icon-arrow-up" @click="goTop" style="display: inline-block;background: #ddd;font-size: 20px;padding: 2px; vertical-align:middle; margin-left: 5px;cursor: pointer;"></i></el-col>
      	</el-row>
    </el-footer>
</template>
<script>
	export default{
		name:"my-footer",
		data(){
			return{
				top : 0,
				scroll_T : 0,
			}
		},
		created(){
			
		},
		mounted(){
	  		this.init();
		},
		watch:{
    		$route(to,from){
    			
    		}
    	},
		methods:{
			init(){
				this.top = document.querySelector(".el-main").scrollTop;
			},
			goTop(){
				var newTop = document.querySelector(".el-main").scrollTop;
				var timers = setInterval(()=>{
					document.querySelector(".el-main").scrollTop -= (newTop-this.top)/20;
					if(document.querySelector(".el-main").scrollTop <= 0 ){
						clearInterval(timers);
					}
				},16.66)
			}
		}
	}
</script>
<style>
	
</style>