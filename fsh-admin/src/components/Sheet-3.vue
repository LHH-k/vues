<template>
	<div id="sheet-3">		
		<h3>合约信息报表</h3>
	</div>
</template>
<script>
	
	export default{
		name:"sheet-3",
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