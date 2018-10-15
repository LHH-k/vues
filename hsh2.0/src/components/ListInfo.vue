<template>
  <div class="listInfo" v-if="p_id">
    <ul class="list">
      <li>
        <div class="top-list">
          <img :src='p_info.list_img' :style="p_info.style">
          <div class="t1"><span>{{p_info.product_name}}</span></div>
          <div class="t2">
            <span v-for='(item,index) in p_info.p_labels' :key='index'>{{item}}</span>
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
      <li v-if="p_id==2">
        <div>配件价格表参考</div>
        <div><a style="color:#489ef0;text-decoration:underline;" @click="$router.push({name:'info360'})">点击查看</a></div>
      </li>
    </ul>
    <div class="info-imgs" v-if="p_info.info_img">
      <img :src="p_info.info_img">
      <img src="../assets/images/list-cn.jpg">
    </div>
    <div class="buy-btn">
      <div class="back" @click="$router.push({ name: 'home'})">返回首页</div>
      <div class="buy" @click="isHasP(p_id)">立即购买</div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'listInfo',
    data () {
      return {
        p_id:null,  //product_id
        p_info:{},  //产品详情
      }
    },
    components:{

    },
    created(){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.p_id = parseInt(this.$route.params.type);

      //产品的product_id
        // 39 开锁 // 40 疏通
        // 2 360家庭维修 // 3 热水器维修
        // 30 360家电清洗 // 32 油烟机清洗 // 36 空调清洗 // 35 冰箱清洗
        // 33 挂机加氟 // 34 柜机加氟
      switch(this.p_id){
        case 40 :
          this.p_info = {
            product_name:'家庭管道疏通',
            product_price:'86元/次',
            product_nr:'家庭管道疏通',
            isZs:false,
            info_img:require('../assets/images/list-ks.jpg'),
            list_img:require('../assets/images/p_pic_1.png'),
            p_labels:['厕所','厨卫管道','地漏'],
            style:{left:'.15rem'},
          };
          break;
        case 39 :
          this.p_info = {
            product_name:'家庭紧急开锁',
            product_price:'86元/次',
            product_nr:'家庭开锁',
            isZs:false,
            info_img:require('../assets/images/list-st.jpg'),
            list_img:require('../assets/images/p_pic_2.png'),
            p_labels:['防盗门','家庭大门','室内门'],
            style:{height: '70%',top: '15%',left:'.12rem'},
          };
          break;
        case 2 :
          this.p_info = {
            product_name:'家庭综合维修',
            product_price:'360元/年',
            product_nr:'家电维修、厨卫五金维修',
            isZs:false,
            info_img:require('../assets/images/list-jtwx.jpg'),
            list_img:require('../assets/images/p_pic_3.png'),
            p_labels:['家电','生活五金'],
            style:{},
          };
          break;
        case 3 :
          this.p_info = {
            product_name:'热水器维修',
            product_price:'199元/年',
            product_nr:'家庭热水器维修',
            isZs:'100万燃气责任险一年',
            info_img:require('../assets/images/list-rsqwx.jpg'),
            list_img:require('../assets/images/p_pic_5.png'),
            p_labels:['热水器','燃气险'],
            style:{},
          };
          break;
        case 30 :
          this.p_info = {
            product_name:'家庭电器清洗',
            product_price:'360元/4台次',
            product_nr:'家庭油烟机、空调、冰箱清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-360qx.jpg'),
            list_img:require('../assets/images/p_pic_7.png'),
            p_labels:['油烟机','空调','冰箱'],
            style:{},
          };
          break;
        case 32 :
          this.p_info = {
            product_name:'油烟机清洗',
            product_price:'128元/台',
            product_nr:'家庭油烟机深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-yyjqx.jpg'),
            list_img:require('../assets/images/p_pic_yyjqx.png'),
            p_labels:['中式','欧式'],
            style:{},
          };
          break;
        case 36 :
          this.p_info = {
            product_name:'空调清洗',
            product_price:'99元/台',
            product_nr:'家庭空调深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-ktqx.jpg'),
            list_img:require('../assets/images/p_pic_ktqx.png'),
            p_labels:['挂机','柜机'],
            style:{},
          };
          break;
        case 35 :
          this.p_info = {
            product_name:'冰箱清洗',
            product_price:'99元/台',
            product_nr:'家庭冰箱深度清洗',
            isZs:'家庭开锁、家庭管道疏通各一次',
            info_img:require('../assets/images/list-bxqx.jpg'),
            list_img:require('../assets/images/p_pic_bxqx.png'),
            p_labels:['单开门','双开门'],
            style:{},
          };
          break;
        case 33 :
          this.p_info = {
            product_name:'挂机空调加氟',
            product_price:'158元/台',
            product_nr:'家庭挂机空调加氟',
            isZs:'空调清洗服务一次',
            info_img:require('../assets/images/list-jf1.jpg'),
            list_img:require('../assets/images/p_pic_jf1.png'),
            p_labels:['挂机'],
            style:{height:'90%'},
          };
          break;
        case 34 :
          this.p_info = {
            product_name:'柜机空调加氟',
            product_price:'198元/台',
            product_nr:'家庭柜机空调加氟',
            isZs:'空调清洗服务一次',
            info_img:require('../assets/images/list-jf2.jpg'),
            list_img:require('../assets/images/p_pic_jf2.png'),
            p_labels:['柜机'],
            style:{height:'90%'},
          };
          break;
      }
    },
    methods:{
      isHasP(product_id){
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
              this.$http.get(`${BASE_URL}/fnw/get/User360Order/${localStorage.getItem('phone')}?product_id=${product_id}`).then((res)=>{
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
                      this.$router.push({ name: 'addSelect', params:{type:product_id}});
                    }else{
                      this.$router.push({ name: 'buy_before', params:{type:product_id}});
                    }
                  }).catch(()=>{
                    this.$router.push({ name: 'myBuy'});
                  });
                }else{
                  if(hasAdd){
                    this.$router.push({ name: 'addSelect', params:{type:product_id}});
                  }else{
                    this.$router.push({ name: 'buy_before', params:{type:product_id}});
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
  .buy-btn{position: fixed;left: 0;bottom: 0;width: 100%;line-height:3;font-size: .16rem; color: #fff;text-align: center;letter-spacing: 2px;overflow: hidden;}
  .buy-btn .back{width:40%; background:#5f9dea;float: left;}
  .buy-btn .buy{width:60%; background:#eb8032;float: right;}

  .top-list{background: #fff;position: relative;text-align: right;height: 1.5rem;padding:.1rem .15rem;}
  .top-list img{position: absolute;height: 80%;left: .15rem; top: 10%;}
  .top-list .t1{font-size: 0;margin-top: .25rem;}
  .top-list .t1 span{vertical-align: middle;display: inline-block;line-height: .4rem;}
  .top-list .t1 span:first-child{color:#eb8032;font-size: .18rem;}
  .top-list .t1 span:last-child{font-size:.24rem;color:#5f9dea;}
  .top-list .t2 span{display:inline-block; background:#5f9dea;color: #fff;padding: 2px 5px;border-radius: 5px;margin: 0 2px;}
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
