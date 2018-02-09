<template>
	<div id="finance-3">		
		<h3>财务类别</h3>
	</div>
</template>
<script>
	
	export default{
		name:"finance-3",
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