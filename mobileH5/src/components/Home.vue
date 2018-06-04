<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.src" />
      </van-swipe-item>
    </van-swipe>
    <div class="my-flex p-list">
      <a @click="isHasP(3)">
        <img src="../assets/images/home_icon1.png" alt="">
        <span>家庭综合维修</span>
      </a>
      <a @click="isHasP(1)">
        <img src="../assets/images/home_icon2.png" alt="">
        <span>家庭开锁</span>
      </a>
      <a @click="isHasP(2)">
        <img src="../assets/images/home_icon3.png" alt="">
        <span>家庭疏通</span>
      </a>
    </div>
    <c-footer :is-cur = '1'></c-footer>
  </div>
</template>

<script>
  import cFooter from './center';
  export default {
    name: 'home',
    data () {
      return {
        images: [
          {src:require('../assets/images/banner.jpg')},   
  
        ]
      }
    },
    components:{
      cFooter
    },
    methods:{
      isHasP(n){
        if(n!=3){
          this.$router.push({ name: 'buy_p', params: { type:n }});
        }else{
          //判断客户是否购买
          if(true){
            this.$dialog.alert({
							title: '温馨提示',
							message: '您暂未开通此服务！'
						}).then(()=>{
              this.$router.push({ name: 'buy_p', params: { type:n }});
						});
          }else{
            this.$router.push({ name: 'callService', params: { type:n }});
          }
        } 
      }
    }
   
  }
</script>

<style scoped>
  img{display: block;}
  .van-swipe-item img{width: 100%;}
  .home{padding-bottom: .55rem;}
  .p-list{background: #fff;margin-top: 10px;padding: 10px 0;}
  .p-list a{text-align: center;flex: 1 1 33.33%;-webkit-flex:1 1 33.33%;}
  .p-list img{width: 45px;margin:0 auto 5px;}
  .p-list a span{font-size: .14rem;color:#333;font-weight: bold;}
</style>
