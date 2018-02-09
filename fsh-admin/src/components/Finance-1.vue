<template>
	<div id="finance-1">		
		<h3>财务汇总</h3>
	</div>
</template>
<script>
	
	export default{
		name:"finance-1",
		data(){
			return{
				data:"",
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