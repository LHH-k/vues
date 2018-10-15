<template>
  <div class="pay">
    <div class="box box1" v-if="unpay">
      <div class="stit m-10">购买项目</div>
      <div class="box-c bg-white my-field"> 
        <van-cell :title="unpay.product_name" :value="pay_money | getM"></van-cell>
      </div>
    </div>
    <div class="box box2">
      <div class="stit m-10">支付方式</div>
      <div class="box-c bg-white my-field"> 
        <van-radio-group v-model="pay_mode">
          <van-cell-group>
            <!-- <van-cell title="和包" clickable @click="radio = '1'">
              <van-radio name="1"></van-radio>
            </van-cell> -->
            <!-- <van-cell title="支付宝" clickable @click="radio = '2'">
              <van-radio name="2" />
            </van-cell> -->
            <van-cell title="微信" clickable @click="radio = '3'">
              <van-radio name="3" />
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
        pruduct_id:null,
        unpay:null,
        pay_mode:null,
        pay_money:0,
      }
    },
    created(){
      this.pruduct_id = this.$route.params.type;
      // 支付回调
      if(this.$route.query.isPay){
        this.$dialog.confirm({
          title: '支付确认',
          message: '请确认微信支付是否已完成？',
          cancelButtonText:'重新支付',
          confirmButtonText:'已完成',
          // closeOnClickOverlay:true,
        }).then(() => {
          let toast = this.$toast.loading({
            duration: 0, // 持续展示 toast
            mask: true, //背景层
            forbidClick: true, // 禁用背景点击
            message: '查询支付结果中...'
          });
          //是否已支付
          this.$http.get(`${BASE_URL}/fnw/get/UserOrders/${localStorage.getItem('phone')}?order_id=${this.$route.query.order_id}`).then((res)=>{
            toast.clear();
            //如果订单为空，表示该订单已完成支付
            if(res.data.res){
                this.$router.replace({ name: 'success', params: { type:'pay'}});
            }else{
              this.$dialog.alert({
                  title: '温馨提示',
                  message: '订单未支付，请重新支付！',
              }).then(() => {
                //未支付订单查询
                this.getUnpay();
              })
            }
          })
        }).catch(()=>{
          //未支付订单查询
          this.getUnpay();
        });
      }else{
        //未支付订单查询
        this.getUnpay();
      }
    },
    filters:{
      getM(m){
        if(typeof m == 'number'){
          return m.toFixed(2) + '元';
        }else{
          return m+'元';
        }
      }
    },  
    components:{
      
    },
    methods:{
      //查询未支付订单
      getUnpay(){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        this.$http.get(`${BASE_URL}/fnw/get/UserUnpayOrders/${localStorage.getItem('phone')}?order_id=${this.$route.query.order_id}`).then((res)=>{
          if(res.data.res){
            this.unpay = res.data.data;
            this.pay_money = this.unpay.price;
          }else{
            this.$dialog.alert({
                title: '温馨提示',
                message: '该订单已支付！',
            }).then(() => {
              this.$router.replace({ name: 'success', params: { type:'pay'}});
            })
          }
          globalToast.clear();
        })
      },
      //支付
      pay(id){
        if(this.pay_mode){
          if(this.unpay.name == '测试'){
            this.pay_money = 0.01;
          }
          var datas = {
            order_id:this.$route.query.order_id,
            url:location.href,
            total_fee:this.pay_money
          }
          this.$http.post(`${BASE_URL}/fnw/post/H5PayReadyForNewOrder`,datas).then((res)=>{
            if(res.data.res){
              window.location.href = res.data.data[0] + '&redirect_url=' + encodeURIComponent(location.href+'&isPay=1');
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
