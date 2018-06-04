<template>
  <div class="buy_p">
    <div v-if='type == 1'>
      <img src="../assets/images/jtks-3.jpg" alt="">
      <div class="btn-b">
        <div>
          86元/次
        </div>
        <div>
          <router-link :to="{name:'pay',params:{'type':type}}">去购买</router-link>
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
          <router-link :to="{name:'pay',params:{'type':type}}">去购买</router-link>
        </div>
      </div>
    </div>
    <div v-else-if="type == 3">
      <img src="../assets/images/jtwx-1.jpg" alt="">
      <img src="../assets/images/jtwx-2.jpg" alt="">
      <img src="../assets/images/jtwx-3.jpg" alt="">
      <div class="btn-b">
        <div>
          360元/年
        </div>
        <div>
          <router-link :to="{name:'buy_360'}">去购买</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buy_p',
    data () {
      return {
        type:null,
      }
    },
    created(){
      this.type = this.$route.params.type;
    },
    components:{
      
    },
   
  }
</script>

<style scoped>
  img{width: 100%;}
  .buy_p{padding-bottom: .5rem;background: #fff;min-height: 100vh;}
  .btn-b{position: fixed;bottom: 0;left: 0;width: 100%;height: .5rem;line-height: .5rem;overflow: hidden;box-shadow: 0 -1px 20px 0px #999;}
  .btn-b>div{float: left;height: 100%;color: #fff;text-align: center;font-size: .16rem;}
  .btn-b>div a{color: #fff}
  .btn-b>div:first-of-type{width: 60%;background: #499eef;}
  .btn-b>div:last-of-type{width: 40%;background: #54b83c;}
</style>
