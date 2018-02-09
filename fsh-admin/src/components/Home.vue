<template>
	<div id="home">
		<el-container style="height: 100%;">
			<sidebar></sidebar>
			<el-container direction="vertical">
				<my-header></my-header>	
				<el-main class="scrollbar">
					<div id="main-top"></div>
					<router-view></router-view>					
				</el-main>
				<my-footer></my-footer>
			</el-container>
		</el-container>
	</div>
</template>
<script type="text/javascript">
	import Sidebar from './Sidebar'
	import myHeader from './Header'
	import myFooter from './Footer'
	export default {
	  name: 'home',
	  data() {
	      return{
	      	
	      }
	  },
	  components: {
	  	Sidebar,
	  	myHeader,
	  	myFooter,
	  },
	  mounted: function () {
		  	this.$nextTick(function(){
		  		
		  	})
		},
		methods:{
			
		}
	}
</script>
<style>	  
	#home{width: 100%;height: 100vh;}
	.el-main{background: #e7e7e7;}
	.main-top{transition: all .6s ease-in-out;position: absolute;top: 0;}
</style>