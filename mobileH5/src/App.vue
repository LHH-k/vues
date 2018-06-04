<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /* @import '/css/animate.css';
  @import '/css/fsh3.css'; */
	#app{ font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
	.animated{animation-duration: .4s !important;-webkit-animation-duration: .4s !important;-moz-animation-duration: .4s !important;}
 	[v-cloak] { display: none;}
</style>
