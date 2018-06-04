<template>
  <div class="success">
    <div v-if="type == 'pay'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>支付成功</p>
        <div class="info">可点击首页中“家庭综合维修”呼叫服务</div>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace('/home')">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'success',
    data () {
      return {
        type:null,
      }
    },
    created(){
      console.log(this.$route)
      this.type = this.$route.params.type;
    },
    components:{
      
    },
    methods:{
      
    }
   
  }
</script>

<style scoped>
  .success{background: #fff;padding: 20px 0;}
  .boxs{width: 90%;margin: 0 auto;padding: 50px 0 30px;text-align: center;color: #40a137;font-size: .60rem;}
  .boxs p{line-height: 2;font-size: .18rem;margin-top: 0;}
  .boxs .info{color: #686868;font-size: .14rem;line-height: 2;width: 85%;margin: 20px auto;}
</style>
