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
        <a @click="showList(2)">
          <img src="../assets/images/home_icon-360wx.png" alt="">
          <span>家庭综合维修</span>
        </a>
        <a @click="showList(3)">
          <img src="../assets/images/home_icon-rsqwx.png" alt="">
          <span>热水器维修</span>
        </a>
      </div>
       <div class="box"> 
        <div class="stit">清洗服务</div> 
        <a @click="showList(36)">
          <img src="../assets/images/home_icon-ktqx.png" alt="">
          <span>空调清洗</span>
        </a>
        <a @click="showList(32)">
          <img src="../assets/images/home_icon-yyjqx.png" alt="">
          <span>油烟机清洗</span>
        </a>
        <a @click="showList(35)">
          <img src="../assets/images/home_icon-bxqx.png" alt="">
          <span>冰箱清洗</span>
        </a>
        <a @click="showList(30)">
          <img src="../assets/images/home_icon-360qx.png" alt="">
          <span>家庭电器清洗</span>
        </a>
      </div>
      <div class="box"> 
        <div class="stit">其他便民服务</div> 
        <a @click="showList(39)">
          <img src="../assets/images/home_icon-jtks.png" alt="">
          <span>家庭开锁</span>
        </a>
        <a @click="showList(40)">
          <img src="../assets/images/home_icon-jtst.png" alt="">
          <span>家庭疏通</span>
        </a>
        <a @click="showList(33)">
          <img src="../assets/images/home_icon-jf1.png" alt="">
          <span>挂机空调加氟</span>
        </a>
        <a @click="showList(34)">
          <img src="../assets/images/home_icon-jf2.png" alt="">
          <span>柜机空调加氟</span>
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
        hasUnpay:false,
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
    },
    methods:{
      //产品对应product_id
        // 39 开锁 // 40 疏通
        // 2 360家庭维修 // 3 热水器维修
        // 30 360家电清洗 // 32 油烟机清洗 // 36 空调清洗 // 35 冰箱清洗
        // 33 挂机加氟 // 34 柜机加氟
      showList(p_id){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        //是否有未支付的服务
        this.$http.get(`${BASE_URL}/fnw/get/CheckUserUnpayOrders/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.res){
            //获取已有服务列表
            this.$dialog.confirm({
              title: '温馨提示',
              message: '您有未支付的订单，是否需要购买新的服务？',
              confirmButtonText:'去支付',
              cancelButtonText:'继续购买',
              closeOnClickOverlay:true,
            }).then(() => {
              this.$router.push({ name: 'order_unpaid'});
            }).catch(()=>{
              this.$router.push({ name: 'listInfo', params:{type:p_id}});
            });
          }else{
            this.$router.push({ name: 'listInfo', params:{type:p_id}});
          }
          globalToast.clear();
        })
      },
    }
   
  }
</script>

<style scoped>
  img{display: block;}
  .van-swipe-item img{width: 100%;}
  .home{padding-bottom: .65rem;min-height: 100vh;background: #fff;}
  .p-list{margin-top: 10px;}
  .p-list .box{padding: 5px 0;border-bottom: 1px solid #ddd;margin: 0 10px;font-size: 0;}
  .p-list .box:last-of-type{border: none;}
  .p-list a{text-align: center;display: inline-block;width: 33.33%;margin: 5px 0 15px;}
  .p-list img{width: 40px;margin:0 auto 5px;}
  .p-list a span{font-size: .12rem;color:#333;}
</style>
