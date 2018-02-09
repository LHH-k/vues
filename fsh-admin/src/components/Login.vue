<template>
	<div class="loginWraper">
		<div>Login</div>
	</div>
</template>
<script>
	export default{
		name:"login",
		data(){
			return{
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