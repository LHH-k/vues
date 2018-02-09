<template>
  <div id="app" v-cloak="">
  	<router-view name="appView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
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
	a{ color: #42b983;}
	.router-link-active{color:#420083}
	#app{ font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
	.animated{animation-duration: .4s !important;-webkit-animation-duration: .4s !important;-moz-animation-duration: .4s !important;}
 	[v-cloak] { display: none;}
</style>
