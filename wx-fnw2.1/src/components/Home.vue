<template>
  <div class="home">
    <ul class="list">
       <!-- 保洁会员 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_6.png' alt="">
          <div class="t1"><span></span><span>家政保洁</span></div>
          <div class="t2">
            <span>会员尊享</span>
            <span>50㎡起</span>
          </div>
          <div class="p1">原价：<span>2元/㎡</span></div>
          <div class="p2">会员抢购价：<span>1元/㎡</span></div> 
          <div class="btn btn-1"  @click='showList(43)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 油烟机清洗-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_yyjqx.png' alt="">
          <div class="t1"><span>油烟机清洗</span></div>
          <div class="t2">
            <span>中式</span>
            <span>欧式</span>
          </div>
          <div class="p1">原价：<span>235元</span></div>
          <div class="p2">抢购价：<span>128元</span></div>
          <div class="btn btn-1" @click='showList(32)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 空调清洗-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_ktqx.png' alt="">
          <div class="t1"><span>空调清洗</span></div>
          <div class="t2">
            <span>挂机</span>
            <span>柜机</span>
          </div>
          <div class="p1">原价：<span>158元</span></div>
          <div class="p2">抢购价：<span>99元</span></div>
          <div class="btn btn-1" @click='showList(36)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 冰箱清洗-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_bxqx.png' alt="">
          <div class="t1"><span>冰箱清洗</span></div>
          <div class="t2">
            <span>单开门</span>
            <span>双开门</span>
          </div>
          <div class="p1">原价：<span>180元</span></div>
          <div class="p2">抢购价：<span>99元</span></div>
          <div class="btn btn-1" @click='showList(35)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 360家庭电器清洗-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_7.png' alt="">
          <div class="t1"><span>（四台次）</span><span>家庭电器清洗</span></div>
          <div class="t2">
            <span>冰箱</span>
            <span>空调</span>
            <span>油烟机</span>
          </div>
          <div class="p1">原价：<span>590元</span></div>
          <div class="p2">抢购价：<span>360元</span></div>
          <div class="btn btn-1" @click='showList(30)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 360家庭维修-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_3.png' alt="">
          <div class="t1"><span></span> <span>家庭综合维修</span></div>
          <div class="t2">
            <span>家电</span>
            <span>生活五金</span>
          </div>
          <div class="p1">原价：<span>720元</span></div>
          <div class="p2">抢购价：<span>360元</span></div>
          <div class="btn btn-1" @click='showList(2)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 挂机空调加氟 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_jf1.png' alt="" style="height:90%;">
          <div class="t1"><span>挂机空调加氟</span></div>
          <div class="t2">
            <span>挂机</span>
          </div>
          <div class="p1">原价：<span>280元</span></div>
          <div class="p2">抢购价：<span>158元</span></div>
          <div class="btn btn-1" @click='showList(33)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 柜机空调加氟 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_jf2.png' alt="" style="height:90%;">
          <div class="t1"><span>柜机空调加氟</span></div>
          <div class="t2">
            <span>柜机</span>
          </div>
          <div class="p1">原价：<span>320元</span></div>
          <div class="p2">抢购价：<span>198元</span></div>
          <div class="btn btn-1" @click='showList(34)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 开锁-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_2.png' style="height: 70%;top: 15%;left:.12rem;" alt="">
          <div class="t1"><span></span><span>家庭紧急开锁</span></div>
          <div class="t2">
            <span>防盗门</span>
            <span>家庭大门</span>
            <span>室内门</span>
          </div>
          <div class="p1">原价：<span>110元</span></div>
          <div class="p2">抢购价：<span>86元</span></div>  
          <div class="btn btn-1"  @click='showList(39)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 疏通-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_1.png' alt="" style="left:.15rem;">
          <div class="t1"><span></span><span>家庭管道疏通</span> </div>
          <div class="t2">
            <span>厕所</span>
            <span>厨卫管道</span>
            <span>地漏</span>
          </div>
          <div class="p1">原价：<span>110元</span></div>
          <div class="p2">抢购价：<span>86元</span></div> 
          <div class="btn btn-1"  @click='showList(40)'>
            点击查看
          </div>
        </div>
      </li>
      <!-- 热水器维修-->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_5.png' alt="">
          <div class="t1"><span></span><span>热水器维修</span></div>
          <div class="t2">
            <span>热水器</span>
            <span>燃气险</span>
          </div>
          <div class="p1">原价：<span>280元</span></div>
          <div class="p2">抢购价：<span>199元</span></div> 
          <div class="btn btn-1"  @click='showList(3)'>
            点击查看
          </div>
        </div>
      </li>

    </ul>
    <c-footer :is-cur = '1'></c-footer>
  </div>
</template>

<script>
  import cFooter from './comp/center';
  import BASE_URL from '../constants';
  export default {
    name: 'home',
    data () {
      return {
        hasUnpay:false,
      }
    },
    components:{
      cFooter
    },
    created(){
      // console.log('home运行')
      //分享设置
      var configDates = {
        url: location.href,
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'],
      };
      this.$http.get('http://wx.funlifeday.com/web/wechat/user/get/config', {params:configDates}).then(function (res) {
        if (res.data) {
          wx.config(res.data);
          wx.ready(function(){
            var data   = {};
            data.title = '你有一份家庭综合维修服务待领取';
            data.desc  = '一个人也能做好维修难事';
            data.link  = 'http://wx.funlifeday.com/web/wechat/user/enter/htmlClient';
            data.img   = 'http://wx.funlifeday.com/storage/qrcodes/ss.jpg';
            wx.onMenuShareTimeline({
                title:   data.title, // 分享标题
                desc:    data.desc, // 分享描述
                link:    data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:  data.img, // 分享图标
                success: function (){
                    // 用户点击了分享后执行的回调函数
                },
            });
            wx.onMenuShareAppMessage({
                title:   data.title, // 分享标题
                desc:    data.desc, // 分享描述
                link:    data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:  data.img, // 分享图标
                type:    '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (){
                    // 用户点击了分享后执行的回调函数
                }
            });
          });
        } else {
          _this.$toast.fail("获取用户信息失败！");
        }
      })
    },
    methods:{
      //产品对应product_id
        // 39 开锁 // 40 疏通
        // 2 360家庭维修 // 3 热水器维修
        // 30 360家电清洗 // 32 油烟机清洗 // 36 空调清洗 // 35 冰箱清洗
        // 33 挂机加氟 // 34 柜机加氟
        // 43 保洁会员 //46 活动保洁
      showList(p_id){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        //是否有未支付的服务
        this.$http.get(`${BASE_URL}/fnw/get/CheckUserUnpayOrders/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.res){
            //获取已有服务列表
            this.$dialog.confirm({
              title: '温馨提示',
              message: '您有未支付的订单，是否需要购买新的服务？',
              confirmButtonText:'去支付',
              cancelButtonText:'继续购买',
              closeOnClickOverlay:true,
            }).then(() => {
              this.$router.push({ name: 'order_unpaid'});
            }).catch(()=>{
              this.$router.push({ name: 'listInfo', params:{type:p_id}});
            });
          }else{
            this.$router.push({ name: 'listInfo', params:{type:p_id}});
          }
          globalToast.clear();
        })
      },
    }
   
  }
</script>

<style scoped>
  .s-t{font-size: .18rem;padding: 0 10px;font-weight: bold;line-height: 2;}
  .home{padding-bottom: .55rem;min-height: 100vh;}
  .list{padding-bottom:.20rem;}
  .list li{margin-bottom: 10px;}
  .top-list{background: #fff;position: relative;text-align: right;height: 1.7rem;padding:.1rem .15rem;}
  .top-list img{position: absolute;height: 80%;left: .2rem; top: 10%;}
  .top-list .t1{font-size: 0;}
  .top-list .t1 span{vertical-align: middle;display: inline-block;line-height: .4rem;}
  .top-list .t1 span:first-child{color:#eb8032;font-size: .18rem;}
  .top-list .t1 span:last-child{font-size:.24rem;color:#5f9dea;}
  .top-list .t2 span{display:inline-block; background:#5f9dea;color: #fff;padding: 2px 5px;border-radius: 5px;}
  .top-list .p1{font-size: .14rem;text-decoration: line-through;color: #5f9dea;margin-top:.05rem; }
  .top-list .p2{font-size: .16rem;color: #ef0100;}
  .top-list .p2 span,.top-list .p1 span{font-weight: bold;}
  .top-list .btn{position: absolute;right: .15rem;bottom: .1rem;}
  .bottom-list{background: #cbe2ff;transition: all .2s ease;-webkit-transition: all .2s ease;overflow: hidden;}
  .bottom-list > div{padding: .1rem;}
  .bottom-list .L-info{font-size: .12rem;}
  .bottom-list .L-info-box-l{font-weight: bold;}

  .btn{display: inline-block;height: .32rem;line-height: .32rem;text-align: center;border-radius: .05rem;font-size: .16rem;font-weight: bold;}
  .btn.btn-1{background: #eb8032;width: 1rem;color:#fff;}
  .btn.btn-2{background: #fff;width: 2.5rem;color: #5f9dea;}
  
  .my-popup{border-radius: 0;}
  .my-popup .t{border-bottom: none;font-weight: bold;}
  .my-popup p{margin: 5px 0;text-align: justify;}
  .my-popup .btn.btn-1{margin: .15rem auto;display: block;width: 70%;background: #5f9dea;}
  .my-popup .c{text-align: center;padding: 20px 0;}
  .my-popup .c p{text-align: center;}
  /* //列表展示的信息 */
  .L-info{padding: 1px;}
  .L-info>.L-info-box{overflow: hidden;line-height: 1.6;}
  .L-info>.L-info-box>.L-info-box-l{float: left;}
  .L-info.w2>.L-info-box>.L-info-box-r{margin-left: .45rem;}
  .L-info.w4>.L-info-box>.L-info-box-r{margin-left: .72rem;}
  .L-info.w6>.L-info-box>.L-info-box-r{margin-left: 1rem;}

</style>
