<template>
	<div id="sheet-2">		
		<h3>租客信息报表</h3>
	</div>
</template>
<script>
	
	export default{
		name:"sheet-2",
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