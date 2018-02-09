<template>
	<div style="text-align: center;" id='unfind'>	
		<h4>404</h4>
		<h3>页面走丢了...</h3>
	</div>
</template>
<script>
	export default{
		name:"unfind",
		data(){
			return{
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
			getDate(){
				
			}
		}
	}
</script>
<style type="text/css">
	h4{font-size: 50px;margin: 100px auto 0;line-height: 100px;}
</style>