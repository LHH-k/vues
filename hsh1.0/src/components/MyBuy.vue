<template>
  <div class="myBuy">
    <div v-show="isShow">
      <div class="myS" v-if='myService.length > 0'>
        <ul>
          <li v-for="(item,index) in myService" :key="index" class="my-order-list">
            <div class="list-tit t1">
              <span>{{item.product_name}}</span>
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
            </div>
            <div class="p-20" style="margin: 20px 0;">					
              <van-button class='btn-primary' size="large" @click="callS(item.id)">呼叫服务</van-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="noB" v-else>
        <img src="../assets/images/cry-2.png" alt="">
        <p>很遗憾~ 您还没有服务</p>
        <router-link to='/home'>去商城逛逛吧</router-link>
      </div>
    </div>
    <c-footer :is-cur = '2'></c-footer>
  </div>
</template>

<script>
  import cFooter from './comp/center';
  import BASE_URL from '../constants';
  export default {
    name: 'myBuy',
    data () {
      return {
        myService:[],   //我已购买的服务
        isShow : false,
        type:null,
      }
    },
    components:{
      cFooter
    },
    created(){
      let globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      // 是否有可使用的服务
      this.$http.get(`${BASE_URL}/fnw/get/User360Order/${localStorage.getItem('phone')}`).then((res)=>{
        if(res.data.res){
          this.myService = res.data.data;
        }
        this.isShow = true;
        globalToast.clear();
      })
    },
    methods:{
      callS(order_id){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.data){
            this.$toast.fail('您有未完成的服务，请等待核销后再呼叫服务~');
          }else{
            this.$http.get(`${BASE_URL}/fnw/get/AvailableService/${localStorage.getItem('phone')}?order_id=${order_id}`).then((res)=>{
              if(res.data.res){
                globalToast.clear();
                this.$router.push({name:'callService',params:{type:3},query:{order_id:order_id}});
              }else{
                this.$toast.fail('48小时内已使用过服务，请等待下次服务生效~');
              }
            })
          }
        })
      }
    }
   
  }
</script>

<style scoped>
  .myBuy{padding-bottom: .55rem;}
  .noB{padding: 50px 20px;text-align: center;}
  .noB img{display: inline-block; width: .8rem;}
  .noB p{line-height: .24rem;color:#686868;}
  .noB a{color:#5f9dea;}
</style>
