<template>
  <div class="order_buy">
    <div class="myS" v-if='buyService.length > 0'>
      <ul>
        <li v-for="(item,index) in buyService" :key="index" class="my-order-list" style="padding-bottom:.15rem;">
          <div class="list-tit t2">
            <span>订单编号：{{item.id}}</span>
            <span>已购买</span>
          </div>
          <div class="list-info">
            <div class="list-list">
              <div class="l">姓名：</div>
              <div class="r">{{item.name}}</div>
            </div>
            <div class="list-list">
              <div class="l">电话：</div>
              <div class="r">{{item.phone}}</div>
            </div>
            <div class="list-list">
              <div class="l">地址：</div>
              <div class="r">{{item.address}}</div>
            </div>
            <div class="list-list w4">
              <div class="l">购买项目：</div>
              <div class="r">{{item.product_name}}</div>
            </div>
            <div class="list-list w6">
              <div class="l">订单生成时间：</div>
              <div class="r">{{item.create_time | get_Date_HMS}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="noB" v-else>
      <img src="../assets/images/cry-2.png" alt="">
      <p>您没有已购买的订单！</p>
      <router-link to='/home'>去商城逛逛吧</router-link>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'order_buy',
    data () {
      return {
        globalToast:null,
        buyService:[],   //未支付的订单
      }
    },
    created(){
       this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      this.$http.get(`${BASE_URL}/fnw/get/UserOrders/${localStorage.getItem('phone')}`).then((res)=>{
        if(res.data.res){
          this.buyService = res.data.data;
        }
        this.globalToast.clear();
      })
    },
    methods:{
      
    }
   
  }
</script>

<style scoped>
  .noB{padding: 50px 20px;text-align: center;}
  .noB img{display: inline-block; width: .8rem;}
  .noB p{line-height: .24rem;color:#686868;}
  .noB a{color:#5f9dea;}
</style>
