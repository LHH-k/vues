<template>
  <div class="userService">
    <div class="top-box my-flex">
      <div class="img-box">
        <img src="../assets/images/work.png" alt="">
      </div>
      <div v-if='service_state == 1' style="font-size: .20rem; line-height:.8rem;margin-left:10px;">等待服务工人接单</div>
      <div v-else class="text-box">
        <div style="font-size:.18rem;">{{worker_info.true_name}}</div>
        <div style="color:#686868;">服务工号：{{my_services.worker_num}}</div>
        <a :href='"tel:" + worker_info.mobile'><i class="iconfont icon-phone"></i></a>
      </div>
    </div>
    <div class="box step-box" :class="{'show':service_state != 1}">
      <van-steps :active="service_state - 1" active-color="#489ef0">
        <van-step>订单已提交</van-step>
        <van-step>工人已接单</van-step>
        <van-step>订单已完成</van-step>	
      </van-steps>
    </div>
    <div class="box info-box" :class="{'show':service_state != 1}">
      <div class="box-t my-field list-field">
        <van-field :value="my_services.name" label="用户姓名：" disabled class="w4" ></van-field>
        <van-field :value="my_services.address" label="用户地址：" type="textarea" autosize disabled rows='1' class="w4" ></van-field>
        <van-field :value="my_services.cat_name" label="服务类型：" disabled class="w4" ></van-field>
        <van-field v-if="service_state==3" :value="my_services.service_total_money + ' 元'" label="服务费用：" class="w4" disabled></van-field>
        <van-field v-if="service_state==3" :value="my_services.service_pay_money + ' 元'" label="实际支付：" class="w4" disabled></van-field>
      </div>
      <div style="border-bottom:1px solid #ccc;margin:10px 0;"></div>
      <div class="box-b my-field list-field">
        <van-field :value="my_services.ask_time | get_Date_HMS" label="服务请求时间：" class="w6" disabled></van-field>
        <van-field :value="my_services.work_start_time | get_Date_HMS" label="服务承接时间：" class="w6" disabled></van-field>
        <van-field v-if="service_state==3" :value="my_services.work_end_time | get_Date_HMS" label="服务完成时间：" class="w6" disabled></van-field>
      </div>
      <div v-if="ewm" class="ewm">
        <h4>核销二维码</h4>
        <img :src="ewm" alt="" style="margin:0 auto">
        <span @click="s_confirm(my_services.id)">确认服务信息</span>
      </div>
      <div v-if="hx" class="ewm">
        <span @click="$router.push({name:'userConfirm',query:{card_id:my_services.id}})">确认服务信息</span>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'userService',
    data () {
      return {
        globalToast: null, //加载弹窗
        my_services: {}, //我的服务
        worker_info: {}, //工人详情
        card_id: '', //card_id
        service_state: 0 ,//服务状态
        ewm:null,
        hx:false,
      }
    },
    created(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      //获取服务信息
      this.card_id = this.$route.query.card_id;
      this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}?card_id=${this.card_id}`).then((res)=>{
        if(res.data.res){
          this.my_services = res.data.data;
          this.worker_info = this.my_services.worker_info;
          //判断状态
          if (this.my_services.status_code == 10) {
            if (this.my_services.worker_info) {
              this.service_state = 2;
              if(this.my_services.service_result !== null){
                this.hx = true;
              }else{
                this.$http.get(`${BASE_URL}/fnw/get/serviceQr/${localStorage.getItem('phone')}`).then((res)=>{
                  if(res.data.res){
                    this.ewm = BASE_URL + res.data.data;
                  }
                })
              }
            } else {
              this.service_state = 1;
            }
          } else {
            this.service_state = 3;
          }
          this.globalToast.clear();
        }
      })
      
    },
    components:{
      
    },
    methods:{
      //确认服务信息
      s_confirm(id){
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}?card_id=${id}`).then((res)=>{
          if(res.data.res){
            this.globalToast.clear();
            if(res.data.data.service_result !== null){
              this.$router.push({name:'userConfirm',query:{card_id:id}});
            }else{
              this.$toast.fail('工人还未发起核销！')
            }
          }
        })
      }
    }
   
  }
</script>

<style scoped>
    .top-box{padding: .15rem;background: #fff;margin-bottom: 10px;}
    .box{background: #fff;margin-bottom: 10px;display: none;}
    .show{display:block;}
    .img-box{width:.8rem;height: .8rem;background: #edecf1;border-radius: 50%;overflow: hidden;margin:0 5px;}
    .img-box img{display: inline-block;width: 100%;height: 100%;}
    .text-box{padding: .1rem 0;margin-left: 10px;flex: auto;position: relative;}
    .text-box i{position: absolute;right: 0;top: 50%;color: #489ef0;font-size:.38rem;margin-top: -.18rem;}
    .text-box > div{line-height: .3rem;font-size: .14rem;}
    .text-box > div > span{display: inline-block;vertical-align: middle;}
    .step-box{margin:10px;border-radius: 10px;overflow: hidden;}
    .info-box{padding: 15px;}
    .info-box .my-field.list-field.box-b .van-field .van-cell__title{width:104px;}
    .info-box .my-field.list-field.box-b .van-cell__text{width: 85px;}
    .my-field.list-field .van-cell{color:#333;}
    .my-field.list-field input:disabled, .my-field.list-field textarea:disabled{color: #333;}
    .ewm{padding:10px;text-align:center;}
    .ewm span{font-size: 18px;color: #489ef0;display: inline-block;padding:5px 15px;border:1px solid #489ef0;}
</style>
