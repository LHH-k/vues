<template>
  <div class="listInfo" v-if="p_id">
    <ul class="list">
      <!-- 油烟机清洗-->
      <li v-if="p_id==6">
        <div class="top-list">
          <img src='../assets/images/p_pic_yyjqx.png' alt="">
          <div class="t1"><span>油烟机清洗</span></div>
          <div class="t2">
            <span>中式</span>
            <span>欧式</span>
          </div>
        </div>
      </li>
      <!-- 空调清洗-->
      <li v-if="p_id==7">
        <div class="top-list">
          <img src='../assets/images/p_pic_ktqx.png' alt="">
          <div class="t1"><span>空调清洗</span></div>
          <div class="t2">
            <span>挂机</span>
            <span>柜机</span>
          </div>
        </div>
      </li>
      <!-- 冰箱清洗-->
      <li v-if="p_id==8">
        <div class="top-list">
          <img src='../assets/images/p_pic_bxqx.png' alt="">
          <div class="t1"><span>冰箱清洗</span></div>
          <div class="t2">
            <span>单开门</span>
            <span>双开门</span>
          </div>
        </div>
      </li>
      <!-- 360家庭电器清洗-->
      <li v-if="p_id==5">
        <div class="top-list">
          <img src='../assets/images/p_pic_6.png' alt="">
          <div class="t1"><span>（四台次）</span><span>家庭电器清洗</span></div>
          <div class="t2">
            <span>冰箱</span>
            <span>空调</span>
            <span>油烟机</span>
          </div>
        </div>
      </li>
      <!-- 360家庭维修-->
      <li v-if="p_id==3">
        <div class="top-list">
          <img src='../assets/images/p_pic_3.png' alt="">
          <div class="t1"><span></span> <span>家庭综合维修</span></div>
          <div class="t2">
            <span>家电</span>
            <span>生活五金</span>
          </div>
        </div>
      </li>
      <!-- 挂机空调加氟 -->
      <li v-if="p_id==9">
        <div class="top-list">
          <img src='../assets/images/p_pic_jf1.png' alt="" style="height:90%;">
          <div class="t1"><span>挂机空调加氟</span></div>
          <div class="t2">
            <span>挂机</span>
          </div>
        </div>
      </li>
      <!-- 柜机空调加氟 -->
      <li v-if="p_id==10">
        <div class="top-list">
          <img src='../assets/images/p_pic_jf2.png' alt="" style="height:90%;">
          <div class="t1"><span>柜机空调加氟</span></div>
          <div class="t2">
            <span>柜机</span>
          </div>
        </div>
      </li>
      <!-- 开锁-->
      <li v-if="p_id==1">
        <div class="top-list">
          <img src='../assets/images/p_pic_2.png' style="height: 70%;top: 15%;left:.12rem;" alt="">
          <div class="t1"><span></span><span>家庭紧急开锁</span></div>
          <div class="t2">
            <span>防盗门</span>
            <span>家庭大门</span>
            <span>室内门</span>
          </div>
        </div>
      </li>
      <!-- 疏通-->
      <li v-if="p_id==2">
        <div class="top-list">
          <img src='../assets/images/p_pic_1.png' alt="" style="left:.15rem;">
          <div class="t1"><span></span><span>家庭管道疏通</span> </div>
          <div class="t2">
            <span>厕所</span>
            <span>厨卫管道</span>
            <span>地漏</span>
          </div>
        </div>
      </li>
      <!-- 热水器维修-->
      <li v-if="p_id==4">
        <div class="top-list">
          <img src='../assets/images/p_pic_5.png' alt="">
          <div class="t1"><span></span><span>热水器维修</span></div>
          <div class="t2">
            <span>热水器</span>
            <span>燃气险</span>
          </div>
        </div>
      </li>
    </ul>
    <ul class="infos">
      <li>
        <div>{{p_info.product_name}}</div>
        <div>{{p_info.product_price}}</div>
      </li>
      <li>
        <div>服务内容</div>
        <div>{{p_info.product_nr}}</div>
      </li>
      <li v-if="p_info.isZs">
        <div><span>赠送</span></div>
        <div>{{p_info.isZs}}</div>
      </li>
    </ul>
    <div class="info-imgs" v-if="p_info.info_img">
      <img :src="p_info.info_img">
      <img src="../assets/images/list-cn.jpg">
    </div>
    <div @click="isHasP(p_info.product_id)" class="buy-btn">
      立即购买
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'listInfo',
    data () {
      return {
        p_id:null,
        p_info:{
          // product_id:null,
          // product_name:null,
          // product_price:null,
          // product_nr:null,
          // info_img:'',
          // isZs:false,
        }
      }
    },
    components:{

    },
    created(){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.p_id = parseInt(this.$route.params.type);
      //产品p_id
        // 1 开锁 // 2 疏通 // 3 360家庭维修 // 4 热水器维修 
        // 5 360家电清洗 // 6 油烟机清洗 // 7 空调清洗 // 8 冰箱清洗
        // 9 挂机加氟 // 10 柜机加氟
      //p_id对应的product_id
      switch(this.p_id){
        case 1 :
          this.p_info = {
            product_id:39,
            product_name:'家庭管道疏通',
            product_price:'86元/次',
            product_nr:'家庭管道疏通',
            isZs:false,
            info_img:require('../assets/images/list-ks.jpg'),
          };
          break;
        case 2 :
          this.p_info = {
            product_id:40,
            product_name:'家庭紧急开锁',
            product_price:'86元/次',
            product_nr:'家庭开锁',
            isZs:false,
            info_img:require('../assets/images/list-st.jpg'),
          };
          break;
        case 3 :
          this.p_info = {
            product_id:2,
            product_name:'家庭综合维修',
            product_price:'360元/年',
            product_nr:'家电维修、厨卫五金维修',
            isZs:false,
            info_img:require('../assets/images/list-jtwx.jpg'),
          };
          break;
        case 4 :
          this.p_info = {
            product_id:3,
            product_name:'热水器维修',
            product_price:'199元/年',
            product_nr:'家庭热水器维修',
            isZs:'100万燃气责任险一年',
            info_img:require('../assets/images/list-rsqwx.jpg'),
          };
          break;
        case 5 :
          this.p_info = {
            product_id:30,
            product_name:'家庭电器清洗',
            product_price:'360元/4台次',
            product_nr:'家庭油烟机、空调、冰箱清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-360qx.jpg'),
          };
          break;
        case 6 :
          this.p_info = {
            product_id:32,
            product_name:'油烟机清洗',
            product_price:'128元/台',
            product_nr:'家庭油烟机深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-yyjqx.jpg'),
          };
          break;
        case 7 :
          this.p_info = {
            product_id:36,
            product_name:'空调清洗',
            product_price:'99元/台',
            product_nr:'家庭空调深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-ktqx.jpg'),
          };
          break;
        case 8 :
          this.p_info = {
            product_id:35,
            product_name:'冰箱清洗',
            product_price:'99元/台',
            product_nr:'家庭冰箱深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-bxqx.jpg'),
          };
          break;
        case 9 :
          this.p_info = {
            product_id:33,
            product_name:'挂机空调加氟',
            product_price:'158元/台',
            product_nr:'家庭挂机空调加氟',
            isZs:'空调清洗服务一次',
            info_img:require('../assets/images/list-jf1.jpg'),
          };
          break;
        case 10 :
          this.p_info = {
            product_id:34,
            product_name:'柜机空调加氟',
            product_price:'198元/台',
            product_nr:'家庭柜机空调加氟',
            isZs:'空调清洗服务一次',
            info_img:require('../assets/images/list-jf2.jpg'),
          };
          break;
      }
    },
    methods:{
      isHasP(n){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        let hasAdd;
        //判断是否有地址的历史记录
        this.$http.get(`${BASE_URL}/fnw/get/CheckUserAddress/${localStorage.getItem('phone')}`).then((res)=>{
          hasAdd = res.data.res;
          //是否有正在使用的服务
          this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
            if(res.data.res){
              this.$toast.fail('您有未完成的服务，请等待核销后再购买~');
            }else{
              // 是否有已购买过对应的服务
              this.$http.get(`${BASE_URL}/fnw/get/User360Order/${localStorage.getItem('phone')}?product_id=${n}`).then((res)=>{
                globalToast.clear();
                if(res.data.res){
                  //获取已有服务列表
                  this.$dialog.confirm({
                    title: '温馨提示',
                    message: '您已经购买过此类服务，是否需要购买新的服务？',
                    confirmButtonText:'去购买',
                    cancelButtonText:'去使用',
                    closeOnClickOverlay:true,
                  }).then(() => {
                    if(hasAdd){
                      this.$router.push({ name: 'addSelect', params:{type:n}});
                    }else{
                      this.$router.push({ name: 'buy_before', params:{type:n}});
                    }
                  }).catch(()=>{
                    this.$router.push({ name: 'myBuy'});
                  });
                }else{
                  if(hasAdd){
                    this.$router.push({ name: 'addSelect', params:{type:n}});
                  }else{
                    this.$router.push({ name: 'buy_before', params:{type:n}});
                  }
                }   
              })
            }
          })
        })
        
      }
    }
   
  }
</script>

<style scoped>
  .listInfo{min-height: 100vh;}
  .infos{background: #fff;margin-bottom: 10px;padding:0 .1rem;}
  .infos li{border-bottom: 1px solid #ddd;overflow: hidden;line-height: .4rem;height: .4rem; color:#333;font-size: .14rem;}
  .infos li:last-child{border: none;}
  .infos li > div:first-child{float: left;font-weight: bold;}
  .infos li > div:last-child{float: right;}
  .infos li:first-child > div:last-child{color: #e60000;}
  .infos li:last-child > div:first-child span{font-weight: normal;color:#e60000;position: relative;border: 1px solid #e60000;display: block;height: .2rem;line-height:.18rem;padding:0 .1rem;border-radius: 5px;overflow: hidden;top: .1rem;}

  .info-imgs{padding-bottom: .6rem;background: #fff;}
  .info-imgs img{width: 100%;}
  .list{margin-bottom: 10px;}
  .buy-btn{position: fixed;left: 0;bottom: 0;width: 100%;line-height:3;font-size: 18px;background: #eb8032; color: #fff;text-align: center;letter-spacing: 2px;}

  .top-list{background: #fff;position: relative;text-align: right;height: 1.5rem;padding:.1rem .15rem;}
  .top-list img{position: absolute;height: 80%;left: .15rem; top: 10%;}
  .top-list .t1{font-size: 0;margin-top: .25rem;}
  .top-list .t1 span{vertical-align: middle;display: inline-block;line-height: .4rem;}
  .top-list .t1 span:first-child{color:#eb8032;font-size: .18rem;}
  .top-list .t1 span:last-child{font-size:.24rem;color:#5f9dea;}
  .top-list .t2 span{display:inline-block; background:#5f9dea;color: #fff;padding: 2px 5px;border-radius: 5px;}
  .top-list .p1{font-size: .14rem;text-decoration: line-through;color: #5f9dea;margin-top:.05rem; }
  .top-list .p2{font-size: .16rem;color: #ef0100;}
  .top-list .p2 span,.top-list .p1 span{font-weight: bold;}
  .top-list .btn{position: absolute;right: .15rem;bottom: .1rem;}

  .btn{display: inline-block;height: .32rem;line-height: .32rem;text-align: center;border-radius: .05rem;font-size: .16rem;font-weight: bold;}
  .btn.btn-1{background: #eb8032;width: 1rem;color:#fff;}
  .btn.btn-2{background: #fff;width: 2.5rem;color: #5f9dea;}
  
  /* //列表展示的信息 */
  .L-info{padding: 1px;}
  .L-info>.L-info-box{overflow: hidden;line-height: 1.6;}
  .L-info>.L-info-box>.L-info-box-l{float: left;}
  .L-info.w2>.L-info-box>.L-info-box-r{margin-left: .45rem;}
  .L-info.w4>.L-info-box>.L-info-box-r{margin-left: .72rem;}
  .L-info.w6>.L-info-box>.L-info-box-r{margin-left: 1rem;}
  
</style>
