<template>
	<div id="news">		
		<h3>我是新闻页</h3>
		<ul>
			<li v-for="list in news">{{list}}</li>
		</ul>
		<button @click="getDate">获取数据</button>
	</div>
</template>
<script>
	import {TEST} from '../constants';
	
	export default{
		name:"news",
		data(){
			return{
				news:["新闻列表1","新闻列表2","新闻列表3","新闻列表4","新闻列表5"],
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
				var _this = this;
				this.$http.get(TEST).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					console.log(err)
				});
			}
		}
	}
</script>