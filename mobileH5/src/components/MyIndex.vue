<template>
  <div class="myIndex">
			<div class="top">
				<div class="avatar-box">
					<img src="../assets/images/avater.jpg" alt="">
				</div>
				<div class="txt">{{user_info.nickname}}</div>
			</div>
			<div class="center">
				<van-cell-group>
					<van-cell title="已完成服务" is-link url=""></van-cell>
					<van-cell title="客服中心" is-link @click="phoneShow = true"></van-cell>
				</van-cell-group>
				<van-popup v-model="phoneShow" class='my-popup kf' prevent-scroll>
					<div class="t">客 服</div>
					<div class="c">
						<div>
							<span><van-icon name="phone"></van-icon></span>
							<a href="tel:4008084989">400-808-4989</a>
						</div>
					</div>
				</van-popup>
			</div>
			<ul>
				<li v-for="(item,index) in my_services" :key="index">
					<a :href='"user-services-info.html#" + item.id'>
						<div class="t">
							<div :class="{'finish':item.status_code ==1}">{{item.cat_name}}<i v-if="item.cat_id != 1 && item.cat_id != 2">维修</i></div>
							<span v-if="item.status_code == 1" style="color:#686868;">{{item.status}}</span>
							<span v-else>{{item.status}}</span>
						</div>
						<div class="b">
							<div>
								<i class="iconfont icon-weibiaoti-"></i>
								{{item.address}}
							</div>
							<div>
								<i class="iconfont icon-rili"></i>
								{{item.ask_time | get_Date}}
							</div>
						</div>
					</a>
				</li>
			</ul>
    <c-footer :is-cur = '2'></c-footer>
  </div>
</template>

<script>
import cFooter from "./center";
export default {
  name: "myIndex",
  data() {
    return {
      user_info: {}, //个人信息
      phoneShow: false, //客服电话显示
      my_services: {}, //我的服务
    };
  },
  components: {
    cFooter
  },
  created(){
    
  },
  methods:{
    // 初始化
    cartView: function cartView() {
      
    },   
  }
};
</script>

<style scoped>
  .myIndex{min-height: 100vh;overflow: hidden;}
  .top{position: relative;padding: 25px 0;background: url(../assets/images/wave1.png) no-repeat top center;background-size: 100%;background-color:#fff;}
  .top .avatar-box{margin:20px auto;width: 100px;height: 100px;border-radius: 50%;border: 3px solid #fff;overflow: hidden;background: #eee;box-shadow: 0 0 20px -5px #489ef0;-webkit-box-shadow: 0 0 20px -5px #489ef0;}
  .top .avatar-box img{display: block;width: 100%;height: 100%;}
  .top .txt{text-align: center;font-size: .18rem;}
  .center{padding:30px 5%;background: #fff;}
  .center .my-flex > div{flex: auto; -webkit-flex: auto;text-align: center;margin: .10rem 0;}
  .center .my-flex > div div{font-size: .26rem;color:#489ef0;line-height: 1.6;}
  .center .my-flex > div span{color:#686868;line-height: 2;}
  .center .van-cell-group .van-cell{padding: 10px 5px;}
  .center .van-cell-group .van-cell__value--link{padding-right: 28px;}
  .center .van-cell:not(:last-child)::after{left: 0;}
  .center .van-cell--clickable:active{background: transparent;}
  .center .van-cell{color: #686868;font-size: .16rem;}
  .center .van-cell__value{color: #489ef0;}
  .kf{min-height: auto;}
  .kf .c{padding: 30px 0;text-align: center;}
  .kf .c div{display: inline-block;background: #489ef0;height:40px;line-height: 30px;padding:5px 10px;border-radius: 40px;font-size: 0;padding-left: 5px;}
  .kf .c div a{color: #fff;font-size: .18rem;display: inline-block;vertical-align: middle;}
  .kf .c div span{display: inline-block;width:30px;height: 30px;background: #fff;border-radius: 50%;margin-right:5px;font-size: 16px;vertical-align: middle;}
  .kf .c div span .van-icon{color:#489ef0;line-height: 30px;}
  ul li{background:#fff;padding: 5px 10px;margin: 25px auto;width: 90%;border-radius: 5px;box-shadow: 0 10px 25px -10px #489ef0;-webkit-box-shadow: 0 10px 25px -10px #489ef0;}
  .icon-field .iconfont{color: #686868;}
  .t{overflow: hidden;line-height: 20px; padding: 10px 0;}
  .t div{color: #333;font-size: .16rem;position: relative;float: left;padding-left: .1rem;}
  .t div::after{content:'';width: 3px;height: 100%;background: #489ef0;left: 0;top: 0;position: absolute;}
  .t div.finish::after{background: #333;}
  .t span{display: block;float: right;color: #489ef0;margin-right: 5px;}
  .b{color: #686868;}
  .b div{border-top: 1px solid #ddd;padding:10px;padding-left: 40px;line-height: .24rem;position: relative;font-size: .14rem;}
  .b i{position: absolute;left: 10px;top: 10px;font-size: .2rem;}
</style>
