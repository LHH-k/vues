<template>
  <div class="order_unpaid">
    <div class="myS" v-if='unpaidService.length > 0'>
      <ul>
        <li v-for="(item,index) in unpaidService" :key="index" class="my-order-list">
          <div class="list-tit t2">
            <span>订单编号：{{item.id}}</span>
            <span>未付款</span>
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
              <div class="r" v-if='item.product_id == 1'>{{item.ext_type==1 ? '家庭疏通' : '家庭开锁'}}</div>
              <div class="r" v-else>{{item.product_name}}</div>
            </div>
            <div class="list-list w6">
              <div class="l">订单生成时间：</div>
              <div class="r">{{item.create_time | get_Date_HMS}}</div>
            </div>
          </div>
          <div class="my-btns" style="margin: 10px 0;">				
            <van-button v-if="item.product_id != 1" class='btn-primary' style="width:60%;" @click="$router.push({name:'pay',params:{type:3},query:{order_id:item.id}})">去支付</van-button>
            <van-button v-else class='btn-primary' style="width:60%;" @click="$router.push({name:'pay',params:{type:item.ext_type},query:{order_id:item.id}})">去支付</van-button>
            <van-button class='btn-danger' style="background:#ec5e69;" @click="del(item.id,index)">删除</van-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="noB" v-else>
      <img src="../assets/images/cry-2.png" alt="">
      <p>您没有未支付订单哦！</p>
      <router-link to='/home'>去商城逛逛吧</router-link>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'order_unpaid',
    data () {
      return {
        globalToast:null,
        unpaidService:[],   //未支付的订单
      }
    },
    created(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      this.$http.get(`${BASE_URL}/fnw/get/UserUnpayOrders/${localStorage.getItem('phone')}`).then((res)=>{
        if(res.data.res){
          this.unpaidService = res.data.data;
        }
        this.globalToast.clear();
      })
    },
    methods:{
      del(id,i){
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '删除中...'
        });
        this.$http.get(`${BASE_URL}/fnw/delete/UserUnpayOrder/${localStorage.getItem('phone')}?order_id=${id}`).then((res)=>{
          if(res.data.res){
            this.unpaidService.splice(i,1);
            this.$toast.success('删除成功！');
          }
        })
      }
    }
   
  }
</script>

<style scoped>
  .noB{padding: 50px 20px;text-align: center;}
  .noB img{display: inline-block; width: .8rem;}
  .noB p{line-height: .24rem;color:#686868;}
  .noB a{color:#5f9dea;}
  .order_unpaid .my-btns{text-align: center;}
  .order_unpaid .my-btns button{display: inline-block;width: 25%;margin:0 2%; background: #489ef0;color: #fff;border-radius: 5px;}
</style>
