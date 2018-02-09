<template>
	<div id="room-2">		
		<h3>业主管理</h3>
	</div>
</template>
<script>
	
	export default{
		name:"room-2",
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