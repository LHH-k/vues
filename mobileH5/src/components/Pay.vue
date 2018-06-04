<template>
  <div class="pay">
    <div class="box box1">
      <div class="stit m-10">购买项目</div>
      <div class="box-c bg-white my-field"> 
        <van-cell title="工单池" value="360.00元"></van-cell>
      </div>
    </div>
    <div class="box box2">
      <div class="stit m-10">支付方式</div>
      <div class="box-c bg-white my-field"> 
        <van-radio-group v-model="pay_mode">
          <van-cell-group>
            <van-cell title="和包" clickable @click="radio = '1'">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="支付宝" clickable @click="radio = '2'">
              <van-radio name="2" />
            </van-cell>
            <van-cell title="微信" clickable @click="radio = '3'">
              <van-radio name="3" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="p-10" style="margin: 20px 0;">					
        <van-button class='btn-primary' size="large" @click="pay()">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay',
    data () {
      return {
        type:null,
        pay_mode:null,
      }
    },
    created(){
      console.log(this.$route)
      this.type = this.$route.params.type;
    },
    components:{
      
    },
    methods:{
      pay(){
        if(this.pay_mode){
          this.$router.replace({ name: 'success', params: { type:'pay'}});
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
