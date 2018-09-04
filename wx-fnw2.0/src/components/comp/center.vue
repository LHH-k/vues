<template>
  <div class="c-footer my-flex">
    <div :class="{'active':isCur==1}" class="my-flex-item">
       <router-link to="/home">
        <img src="../../assets/images/list-1-1.png" alt="">
        <img src="../../assets/images/list-1-2.png" alt="">
        <span>商城</span>
       </router-link>
    </div>
    <div :class="{'active':isCur==2}" class="my-flex-item">
       <router-link to="/myBuy">
        <img src="../../assets/images/list-22-1.png" alt="">
        <img src="../../assets/images/list-22-2.png" alt="">
        <span>可呼叫服务</span>
       </router-link>
    </div>
    <div :class="{'active':isCur==3}" class="my-flex-item">
      <router-link to='/myIndex'>
        <img src="../../assets/images/list-2-1.png" alt="">
        <img src="../../assets/images/list-2-2.png" alt="">
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center',
  props:['isCur'],
  data () {
    return {
      
    }
  },
  
}
</script>

<style scoped>
  img{margin: 0 auto 2px;display: none;height:.25rem;}
  .c-footer{position: fixed;bottom: 0;left: 0;width: 100%;min-height: 50px;text-align: center;background: #fff;padding: 5px 0;box-shadow: 0 -5px 20px 0px #ddd;}
  .my-flex > div img:first-of-type{display: block;}
  .my-flex-item{flex:1 1 33.33%;}
  .my-flex .active img:first-of-type{display: none;}
  .my-flex .active img:last-of-type{display: block;}
  .c-footer .active span{color: #5f9dea;}
  .c-footer span{font-size: .12rem;color: #c7c7c7;line-height: 1;}
</style>
