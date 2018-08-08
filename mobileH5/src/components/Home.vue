<template>
  <div class="home">
    <div style="background:#f5f5f5;padding-bottom:10px;">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="p-list">
      <div class="box"> 
        <div class="stit">维修服务</div> 
        <a @click="isHasP(3)">
          <img src="../assets/images/home_icon1.png" alt="">
          <span>家庭综合维修</span>
        </a>
      </div>
      <div class="box"> 
        <div class="stit">便民服务</div> 
        <a @click="isHasP(1)">
          <img src="../assets/images/home_icon2.png" alt="">
          <span>家庭开锁</span>
        </a>
        <a @click="isHasP(2)">
          <img src="../assets/images/home_icon3.png" alt="">
          <span>家庭疏通</span>
        </a>
      </div>
    </div>
    <c-footer :is-cur = '1'></c-footer>
  </div>
</template>

<script>
  import cFooter from './comp/center';
  import BASE_URL from '../constants';
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
    created(){
      // console.log('home运行')
      //是否购买过服务
      
    },
    methods:{
      isHasP(n){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.data){
            this.$toast.fail('您有未完成的服务，请等待核销后再购买~');
          }else{
            if(n==3){
              // 是否有已购买的服务
              this.$http.get(`${BASE_URL}/fnw/get/User360Order/${localStorage.getItem('phone')}`).then((res)=>{
                globalToast.clear();
                if(res.data.res){
                  //获取已有服务列表
                  this.$dialog.confirm({
                    title: '温馨提示',
                    message: '您已经购买过此类服务，是否需要购买新的服务？',
                    confirmButtonText:'去购买',
                    cancelButtonText:'去使用',
                    closeOnClickOverlay:true,
                  }).then(() => {
                    this.$router.push({ name: 'buy_p', params:{type:n}});
                  }).catch(()=>{
                    this.$router.push({ name: 'myBuy'});
                  });
                }else{
                  this.$router.push({ name: 'buy_p', params:{type:n}});
                }
              })
            }else{
              globalToast.clear();
              this.$router.push({ name: 'buy_p', params:{type:n}});
            }
          }
        })
      }
    }
   
  }
</script>

<style scoped>
  img{display: block;}
  .van-swipe-item img{width: 100%;}
  .home{padding-bottom: .55rem;min-height: 100vh;background: #fff;}
  .p-list{margin-top: 10px;}
  .p-list .box{padding: 5px 0 15px;border-bottom: 1px solid #ddd;margin: 0 10px;}
  .p-list .box:last-of-type{border: none;}
  .p-list a{text-align: center;display: inline-block;width: 33.33%;}
  .p-list img{width: 45px;margin:0 auto 5px;}
  .p-list a span{font-size: .14rem;color:#333;}
</style>
