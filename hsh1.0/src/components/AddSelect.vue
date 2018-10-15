<template>
  <div class="addSelect">
    <div class="add box">
      <router-link :to='{ name: "buy_before" , params:{type:$route.params.type}}'>
        <van-icon name='add-o'></van-icon>
        <span>新增服务信息</span>  
        <van-icon name='arrow' style="float:right;"></van-icon>
      </router-link>
    </div>
    <ul>
      <li class="box" v-for="(item , index) in addList" :key="index" :class="{'active': isC == item.id}" @click="isC = item.id">
        <span class="s">
          <van-icon name="success"></van-icon>
        </span>
        <div style="color:#333;">
          <span style="margin-right:10px;">{{item.name}}</span>
          <span>{{item.mobile}}</span>
          <van-icon name="delete" @click.stop="del(item.id,index)"></van-icon>
        </div>
        <div style="color:#a3a3a3;">{{item.address}}</div>
      </li>
    </ul>
    <div class="p-10" style="margin: 20px 0;text-align:center;">					
      <van-button class='btn-primary' size="large" @click="goNext($route.params.type)">确 认</van-button>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'addSelect',
    data () {
      return {
        globalToast : null,
        addList : [],
        isC : null,
      }
    },
    created(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      this.$http.get(`${BASE_URL}/fnw/get/UserAddressList/${localStorage.getItem('phone')}`).then((res)=>{
        this.addList = res.data.data;
      })
    },
    mounted: function mounted() {
      //生命周期
      this.$nextTick(function () {
        this.globalToast.clear();
      });
    },
    methods:{
      //确定
      goNext(n){
        if(this.isC){
          if(n==3){
            this.$router.push({name:'buy_before',params:{type:n},query:{add_id:this.isC}});
          }else{
            this.$router.push({name:'callService',params:{type:n},query:{add_id:this.isC}});
          }
        }else{
          this.$toast.fail("请选择需要服务的地址！");
        }
      },
      // 删除
      del(id,i){
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '删除中...'
        });
        this.$http.post(`${BASE_URL}/fnw/post/DelUserAddress/${localStorage.getItem('phone')}`,{id:id}).then((res)=>{
          if(res.data.res){
            this.addList.splice(i,1);
            this.$toast.success('删除成功！');
          }
        })
      }
    }
   
  }
</script>

<style scoped>
  .addSelect .box{background: #fff;margin: .1rem 0;}
  .addSelect .add > a{color: #5f9dea;font-size: .16rem;padding:0 .1rem;overflow: hidden;display: block;}
  .addSelect .add > a i,.addSelect .add > a span{display: inline-block;line-height: 40px;vertical-align: middle;}
  .addSelect .add > a i{font-size: .2rem;}
  .addSelect ul li{padding: .1rem .25rem .1rem .15rem;line-height: 1.6;position: relative;}
  .addSelect ul li div{padding: 3px 0;}
  .addSelect ul li div:nth-of-type(1) span,.addSelect ul li div:nth-of-type(1) i{vertical-align: middle;}
  .addSelect ul li div:nth-of-type(1) i{font-size: .14rem;margin-left: 10px;color: #54b83c;}
  .addSelect ul li .s{display: none;}
  .addSelect ul li.active .s{display: block;position: absolute;right: 0;top: 0;color: #fff;width: .25rem;height: .25rem;}
  .addSelect ul li.active .s i{z-index: 1;font-size: .2rem;margin-top:.05rem;}
  .addSelect ul li.active .s:after{content:'';position: absolute;right: 0;top:0;border: .25rem solid transparent; border-right: .25rem solid #54b83c; border-top: .25rem solid #54b83c;z-index: 0;}
</style>
