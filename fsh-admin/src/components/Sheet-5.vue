<template>
	<div id="sheet-5">		
		<h3>收租信息报表</h3>
	</div>
</template>
<script>
	
	export default{
		name:"sheet-5",
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