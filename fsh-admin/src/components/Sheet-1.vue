<template>
	<div id="sheet-1">		
		<h3>房间配置报表</h3>
	</div>
</template>
<script>
	
	export default{
		name:"sheet-1",
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