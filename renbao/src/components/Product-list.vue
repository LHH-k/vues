<template>
	<div id="product-list" style="background: #fff;padding-bottom: 30px;">
		<div class="tit">
			<el-input v-model="input" size="small" placeholder="请输入关键字查询" style="display: inline-block;width: auto;"></el-input>
			<el-button size="small" type="primary">搜 索</el-button>
		</div>
		<div class="boxs">
			<div class="box mytran" v-for="(item,index) in Data" :key="index" :class="isOpens[index].e ? openClass : closeClass" >
				<div class="stit">{{item.t_tit}}</div>	
				<ul :ref="'li'+index" :style="{height : ulHeight[index].e +'px'}">
					<li v-for="(sitem,index) in item.list" :key="index">
						<img :src="sitem.imgUrl" alt="" />
						<div style="text-align: center; margin-top: 10px;">{{sitem.tit}}</div>
					</li>
				</ul>
				<div class="icon-box" @click="ul_change(index)" :class="'icon-box-'+index"><i class="iconfont1 icon1-arrow-circle-o-top"></i></div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	#product-list .iconfont1{color: #ccc;font-size: 30px;}
	#product-list .icon-box{position: absolute;background: #fff;text-align: center;padding: 5px;left: 50%;bottom: -20px;margin-left: -20px;cursor: pointer;z-index: 100;}
	.tit{padding:15px 20px;font-size: 20px;line-height: 36px;border-bottom: 2px solid #e1e1e1;}
	.stit{font-size: 18px;padding-bottom: 15px;border-bottom:1px solid #E1E1E1;}
	.boxs{padding:0 24px;}
	.box{padding: 30px 0 0;position: relative;}
	.box ul{overflow: hidden;padding-bottom: 30px;border-bottom: 1px dashed #E1E1E1;}
	.box ul li{float: left;margin:30px 30px 0;width: 120px;height: 130px;}
	img{display: block;margin: 0 auto;}
	.mytran ul,.mytran .icon-box{ 
		transition: all 0.3s ease; 
	} 
	.ul-open .icon-box{transform: rotate(0deg);}
	.ul-close .icon-box{transform: rotate(180deg);}
</style>
<script>
	export default{
		name:"product-list",
		data(){
			return{
				input:"",
				Data:[],
				isOpens:[],			//判断是否展开的开关
				ul_H:[],			//展开的最高高度列表
				ulHeight:[],		//当前的高度列表
				ulMin:191,
      			openClass: 'ul-open',
      			closeClass: 'ul-close',
			}
		},
		components:{
			
		},
		watch:{
			Data:{		//data更新后从新渲染页面
				handler: function (val, oldVal){
					this.$nextTick(function(){
				  		this.init();
				  	})
				},
      			deep: true
			},
		},
		created(){
			this.getData();
		},
		mounted: function () {
		  	this.$nextTick(function(){		  		
		  		this.init();
		  	}.bind(this))
		},
		filters:{
			
		},
		methods:{
			init(){
				let refs = this.$refs;
				for(let e in refs){
					this.ul_H.push({e:refs[e][0].offsetHeight});
				}
				this.ulHeight.forEach((e,i)=>{
					e.e = this.ulMin;
					if(this.ul_H[i].e == e.e){
						this.isOpens[i].e = true;
					}
				})
			},
			getData(){
				setTimeout(()=>{
					let newData = [
						{
							t_tit:'责任险',
							list:[
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
								{imgUrl:require('../assets/images/index-icon1.jpg'),tit:'旅游用车承运人险'},
							]
						},
						{
							t_tit:'意外险',
							list:[
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
								{imgUrl:require('../assets/images/index-icon2.jpg'),tit:'旅游意外险'},
							]
						},
						{
							t_tit:'财险',
							list:[
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
								{imgUrl:require('../assets/images/index-icon3.jpg'),tit:'家庭财产险'},
							]
						},
						
					]	
					this.Data = newData;
					this.Data.forEach((e,i)=>{
						this.isOpens.push({e:false});
						this.ulHeight.push({e:''});
					})
				},500)
			},
			ul_change(i){
				//如果最高高度 不等于 最低高度
				if(this.ul_H[i].e !== this.ulMin){					
					this.isOpens[i].e = !this.isOpens[i].e;
					if(this.isOpens[i].e){
						this.ulHeight[i].e = this.ul_H[i].e
					}else{
						this.ulHeight[i].e = this.ulMin;
					}
				}
//				console.log(this.isOpens[i].e,this.ul_H[i].e,this.ulHeight[i].e)
			},
		}
	}
</script>
