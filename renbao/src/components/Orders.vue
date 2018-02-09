<template>
	<div id="orders">		
		订单详情页
	</div>
</template>
<script>
	export default{
		name:"orders",
		data(){
			return{
				
			}
		},
		created(){
			this.getData();
		},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		filters:{
			getMoney(v){
				return v.toFixed(2);
			},
		},
		methods:{
			init(){
				
			},
			//获取数据
			getData(){
				
			},
			
		}
	}
</script>
<style type="text/css">
	
</style>