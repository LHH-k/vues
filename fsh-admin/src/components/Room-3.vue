<template>
	<div id="room-3">		
		<h3>短信催缴</h3>
	</div>
</template>
<script>
	
	export default{
		name:"room-3",
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