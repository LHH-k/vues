<template>
  <div class="success">
    <div v-if="type == 'pay'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>购买成功</p>
        <div class="info">可在首页已购买的服务中呼叫服务！</div>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace('/myBuy')">确定</van-button>
      </div>
    </div>
    <div v-else-if="type == 'call'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>呼叫服务成功</p>
        <div class="info">服务工人将在30分钟内上门提供服务</div>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace('/myIndex')">查看我的服务</van-button>
      </div>
    </div>
    <div v-else-if="type == 'callQx'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>预约服务成功</p>
        <div class="info">服务工人将在30分钟内来电，确认上门服务时间，如有疑问可电话咨询客服400-808-4989</div>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace('/myIndex')">确定</van-button>
      </div>
    </div>
    <div v-else-if="type == 'afterS'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>服务完成</p>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace('/myIndex')">确定</van-button>
      </div>
    </div>
    <div v-else-if="type == 'cash'">
      <div class="boxs box1">
        <van-icon name="checked"></van-icon>
        <p>服务完成</p>
        <div class="info">请将现金交于服务人员！</div>
      </div>
      <div class="p-10" style="margin: 20px 0;text-align:center;">					
        <van-button class='btn-primary' size="large" @click="$router.replace({ name: 'rate', query:{card_id:this.card_id}});">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'success',
    data () {
      return {
        type:null,
        card_id:null,
      }
    },
    created(){
      this.type = this.$route.params.type;
      this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
        if(res.data.res){
          this.card_id = res.data.data[0].id;
        }
      })
    },
    components:{
      
    },
    methods:{
      // lookS(){
      //   let globalToast = this.$toast.loading({
      //     duration: 0, // 持续展示 toast
      //     mask: true, //背景层
      //     forbidClick: true, // 禁用背景点击
      //     message: '加载中...'
      //   });
      //   if(this.card_id){
      //     globalToast.clear();
      //     this.$router.replace({name:'userService',query:{card_id:this.card_id}});
      //   }else{
      //     this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
      //       if(res.data.res){
      //         this.card_id = res.data.data.id;
      //         this.lookS();
      //       }
      //     })
      //   }
      // }
    }
   
  }
</script>

<style scoped>
  .success{background: #fff;padding: 20px 0;}
  .boxs{width: 90%;margin: 0 auto;padding: 50px 0 30px;text-align: center;color: #40a137;font-size: .60rem;}
  .boxs p{line-height: 2;font-size: .18rem;margin-top: 0;}
  .boxs .info{color: #686868;font-size: .14rem;line-height: 2;width: 85%;margin: 20px auto;}
</style>
