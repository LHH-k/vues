<template>
  <div class="order_used">
    <div class="myS" v-if='usedService.length > 0'>
      <ul>
        <li v-for="(item,index) in usedService" :key="index" class="my-order-list" style="padding-bottom:.15rem;">
          <div class="list-tit t1">
            <span v-if="item.cat_id!=1 && item.cat_id!=2">{{item.cat_name}}维修</span><span v-else>{{item.cat_name}}</span>
            <span>{{item.status}}</span>
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
              <div class="l">服务工人：</div>
              <div class="r">{{item.worker_info.true_name}}</div>
            </div>
            <div class="list-list w4">
              <div class="l">服务费用：</div>
              <div class="r">{{item.service_total_money + '元'}}</div>
            </div>
            <div class="list-list w4">
              <div class="l">平台优惠：</div>
              <div class="r">{{item.service_subsidy_money + '元'}}</div>
            </div>
             <div class="list-list w4">
              <div class="l">实际支付：</div>
              <div class="r">{{item.service_pay_money + '元'}}</div>
            </div>  
            <div class="list-list w6">
              <div class="l">服务完成时间：</div>
              <div class="r">{{item.work_end_time | get_Date_HMS}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="noB" v-else>
      <img src="../assets/images/cry-2.png" alt="">
      <p>您还没有已完成的服务~</p>
      <router-link to='/home'>去商城逛逛吧</router-link>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'order_used',
    data () {
      return {
        usedService:[],   //我已购买的服务
      }
    },
    created(){
      let globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      this.$http.get(`${BASE_URL}/fnw/get/UserDoneService/${localStorage.getItem('phone')}`).then((res)=>{
        if(res.data.res){
          this.usedService = res.data.data;
        }
        globalToast.clear();
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
