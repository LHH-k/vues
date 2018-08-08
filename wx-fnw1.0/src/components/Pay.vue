<template>
  <div class="pay">
    <div class="box box1">
      <div class="stit m-10">购买项目</div>
      <div class="box-c bg-white my-field"> 
        <van-cell :title="pay_name" :value="pay_money | getM"></van-cell>
      </div>
    </div>
    <div class="box box2">
      <div class="stit m-10">支付方式</div>
      <div class="box-c bg-white my-field"> 
        <van-radio-group v-model="pay_mode">
          <van-cell-group>
            <van-cell title="微信" clickable @click="radio = '2'">
              <van-radio name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="p-10" style="margin: 20px 0;">					
        <van-button class='btn-primary' size="large" @click="pay($route.query.order_id)">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'pay',
    data () {
      return {
        globalToast: null,
        type:null,
        unpay:null, //未支付的对象
        pay_mode:null,
        pay_money:0,
        pay_name:'',
      }
    },
    created(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      this.type = this.$route.params.type;
 
      //未支付订单查询
      this.$http.get(`${BASE_URL}/fnw/get/UserUnpayOrders/${localStorage.getItem('phone')}?order_id=${this.$route.query.order_id}`).then((res)=>{
        if(res.data.res){
          this.unpay = res.data.data;
          let data = res.data.data;
          //疏通开锁以外的
          if(data.product_id != 1){
            this.pay_name = data.product_name;
            if(data.product_id == 28){
              this.pay_money = 99;
            }else{
              if(this.$route.query.isOne){  //*********如果是保洁卡服务送的卡片******* */
                this.pay_money = 1;
              }else{
                this.pay_money = 360;
              }
            }
          }else{
            if(data.ext_type == 1){
              this.pay_name = '家庭开锁';
            }else if(data.ext_type == 2){
              this.pay_name = '家庭疏通';
            }
            this.pay_money = 86;
          }
        }else{
          if(this.type == 3){
            this.$router.replace({ name: 'success', params: { type:'pay'}});
          }else{
            this.$router.replace({ name: 'success', params: { type:'call'}});
          }
        }
        this.globalToast.clear();
      })
    },
    filters:{
      getM(m){
        return  m.toFixed(2) + '元';
      }
    },  
    components:{
      
    },
    methods:{
      pay(id){
        if(this.pay_mode){
            if(this.unpay.name == '测试'){
              this.pay_money = 0.01;
            }
            this.$http.post('http://wx.funlifeday.com/web/wechat/user/enter/payReadyForNewOrder',{order_id:this.$route.query.order_id, url:location.href, total_fee:this.pay_money}).then((res)=>{
              if(res.data.res){
                window.location.href = location.origin + res.data.data;
              }
            });
        }else{
          this.$toast.fail('请选择支付方式！');
        }
      }
    }
   
  }
</script>

<style>
  .pay .box1 .van-cell__value span{color: #489ef0 !important;}
</style>
