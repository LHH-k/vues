<template>
  <div class="buy_p">
    <div v-if='type == 1'>
      <img src="../assets/images/jtks-3.jpg" alt="">
      <div class="btn-b">
        <div>
          86元/次
        </div>
        <div>
          <a @click="callS(type)">呼叫服务</a>
        </div>
      </div>
    </div>
    <div v-else-if='type == 2'>
      <img src="../assets/images/jtst-3.jpg" alt="">
      <div class="btn-b">
        <div>
          86元/次
        </div>
        <div>
          <a @click="callS(type)">呼叫服务</a>
        </div>
      </div>
    </div>
    <div v-else-if="type == 3">
      <img src="../assets/images/jtwx-1.jpg" alt="">
      <img src="../assets/images/jtwx-2.jpg" alt="">
      <img src="../assets/images/jtwx-3.jpg" alt="">
      <div class="btn-b b2" v-if="$route.query.from == 'out'">
        <div>
          {{m}}元/年
        </div>
        <div>
           <router-link to='/home'>返回主页</router-link>
        </div>
        <div>
          <a @click="callS(type)">去购买</a>
        </div>
      </div>
      <div class="btn-b" v-else>
        <div>
          {{m}}元/年
        </div>
        <div>
          <a @click="callS(type)">去购买</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'buy_p',
    data () {
      return {
        type:null,
        m:360,
      }
    },
    created(){
      this.type = this.$route.params.type;  
      let s =  parseFloat(localStorage.getItem('status'));
      if(s == 5){
        this.m = 199;
      }
    },
    components:{
      
    },
    methods:{
      callS(n){
        let g = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: " "
        });
        //判断是否有地址的历史记录
        this.$http.get(`${BASE_URL}/fnw/get/UserAddressList/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.data.length){
            this.$router.push({ name: 'addSelect', params:{type:n}});
          }else{
            this.$router.push({ name: 'buy_before', params:{type:n}});
          }
          g.clear();
        })
      }
    }
   
  }
</script>

<style scoped>
  img{width: 100%;}
  .buy_p{padding-bottom: .5rem;background: #fff;min-height: 100vh;}
  .btn-b{position: fixed;bottom: 0;left: 0;width: 100%;height: .5rem;line-height: .5rem;overflow: hidden;box-shadow: 0 -1px 20px 0px #999;}
  .btn-b>div{float: left;height: 100%;color: #fff;text-align: center;font-size: .16rem;}
  .btn-b>div a{color: #fff;display: block;width: 100%;height: 100%;}
  .btn-b>div:first-of-type{width: 60%;background: #499eef;}
  .btn-b>div:last-of-type{width: 40%;background: #54b83c;}
  .btn-b.b2>div:nth-of-type(1){width: 40%;background: #499eef;}
  .btn-b.b2>div:nth-of-type(2){width: 30%;background: #ef8737;}
  .btn-b.b2>div:nth-of-type(3){width: 30%;background: #54b83c;}
</style>
