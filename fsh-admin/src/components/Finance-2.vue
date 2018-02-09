<template>
	<div id="finance-2">		
		<h3>财务流水</h3>
	</div>
</template>
<script>
	
	export default{
		name:"finance-2",
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