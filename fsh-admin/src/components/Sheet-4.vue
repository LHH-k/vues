<template>
	<div id="sheet-4">		
		<h3>出租信息报表</h3>
	</div>
</template>
<script>
	
	export default{
		name:"sheet-4",
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