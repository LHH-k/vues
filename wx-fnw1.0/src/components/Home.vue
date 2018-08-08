<template>
  <div class="home">
    <ul class="list" :style = "{top:listTop}">
      <!-- 疏通 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_1.png' alt="">
          <div class="t1">家庭管道疏通</div>
          <div class="t2">
            <span>厕所</span>
            <span>厨卫管道</span>
            <span>地漏</span>
          </div>
          <div class="btn btn-1"  @click='showList(1)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 1,'cur':show == 1}" style="height: 2.11rem">
          <div>
            <div class="L-info w4">
              <div class="L-info-box">
                <div class="L-info-box-l">服务价格：</div>
                <div class="L-info-box-r">86元/次</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">服务内容：</div>
                <div class="L-info-box-r">家庭室内下水管道的疏通服务，包含厕所、地漏、厨卫管道的疏通服务。</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">注意事项：</div>
                <div class="L-info-box-r">
                  1. 不含商业用地的疏通 <br>
                  2. 不含室外主管道<br>
                  3. 服务价格不含服务过程中需要使用的耗材及更换的配件费用
                </div>
              </div>
            </div>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="isHasP(2)">立即购买</a>
          </div>
        </div>
      </li>
      <!-- 开锁 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_2.png' style="height: 74%;top: 13%;" alt="">
          <div class="t1">家庭紧急开锁</div>
          <div class="t2">
            <span>防盗门</span>
            <span>家庭大门</span>
            <span>室内门</span>
          </div>
          <div class="btn btn-1"  @click='showList(2)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 2,'cur':show == 2}" style="height: 2.11rem;">
          <div>
            <div class="L-info w4">
              <div class="L-info-box">
                <div class="L-info-box-l">服务价格：</div>
                <div class="L-info-box-r">86元/次</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">服务内容：</div>
                <div class="L-info-box-r">家庭大门、防盗门、室内门开锁服务。</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">注意事项：</div>
                <div class="L-info-box-r">
                  1. 不含商用场地的开锁 <br>
                  2. 不含指纹锁及电子锁 <br>
                  3. 不含保险柜、楼道、单元门的开锁 <br>
                  4. 服务价格不含服务过程中需要使用及更换的耗材及配件费用 
                </div>
              </div>
            </div>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;"  @click="isHasP(1)">立即购买</a>
          </div>
        </div>
      </li>
      <!-- 家庭维修 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_3.png' alt="">
          <div class="t1">家庭综合维修</div>
          <div class="t2">
            <span>家电</span>
            <span>家具</span>
            <span>门窗</span>
            <span>水暖</span>
            <span>五金</span>
          </div>
          <div class="btn btn-1" @click='showList(3)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 3,'cur':show == 3}" style="height: 3.15rem;">
          <div>
            <div class="L-info w4">
              <div class="L-info-box">
                <div class="L-info-box-l">服务价格：</div>
                <div class="L-info-box-r">360元/年</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">服务内容：</div>
                <div class="L-info-box-r">家庭室内电器的维修服务，家具维修、五金维修、门窗维修。<span style="font-weight: bold;">每次服务减免用户维修费用300元。</span></div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">注意事项：</div>
                <div class="L-info-box-r">
                  1. 不含产品内容外电器产品的维修服务 <br>
                  2. 不含家庭水路、电路的安装、敷设、改造服务 <br>
                  3. 不含产品整件更换服务 <br>
                  4. 不提供家具、门窗安装服务 <br>
                  5. 服务价格不含服务过程中需要使用及更换的耗材及配件费用 <br>
                  6. 每次服务须间隔48小时
                </div>
              </div>
            </div>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="isHasP(3)">立即购买</a>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="txtShow = true">查看维修项目</a>
          </div>
        </div>
      </li>
      <!-- 家庭维修（体验） -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_4.png' alt="">
          <div class="t1"><span style="color:#eb8032;font-size: .18rem;">（体验版）</span>家庭综合维修</div>
          <div class="t2">
            <span>家电</span>
            <span>家具</span>
            <span>门窗</span>
            <span>水暖</span>
            <span>五金</span>
          </div>
          <div class="btn btn-1" @click='showList(4)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 4,'cur':show == 4}" style="height: 1rem;">
          <p style="font-size: .22rem;line-height: 1rem; text-align: center;">敬请期待......</p>
        </div>
        <!-- <div class="bottom-list" :class = "{'unCur':show != 4,'cur':show == 4}" style="height: 2.95rem;">
          <div>
            <div class="L-info w4">
              <div class="L-info-box">
                <div class="L-info-box-l">服务价格：</div>
                <div class="L-info-box-r">99元/次</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">服务内容：</div>
                <div class="L-info-box-r">家庭室内电器的维修服务，家具维修、五金维修、门窗维修。<span style="font-weight: bold;">此次服务减免用户维修费用300元。</span></div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">注意事项：</div>
                <div class="L-info-box-r">
                  1. 不含产品内容外电器产品的维修服务 <br>
                  2. 不含家庭水路、电路的安装、敷设、改造服务 <br>
                  3. 不含产品整件更换服务 <br>
                  4. 不提供家具、门窗安装服务 <br>
                  5. 服务价格不含服务过程中需要使用及更换的耗材及配件费用
                </div>
              </div>
            </div>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="isHasP(4)">立即购买</a>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="txtShow = true">查看维修项目</a>
          </div>
        </div> -->
      </li>
      <!-- 热水器维修 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_5.png' alt="">
          <div class="t1">热水器维修</div>
          <div class="t2">
            <span>热水器</span>
            <span>燃气险</span>
          </div>
          <div class="btn btn-1"  @click='showList(5)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 5,'cur':show == 5}" style="height: 1rem;">
          <p style="font-size: .22rem;line-height: 1rem; text-align: center;">敬请期待......</p>
        </div>
        <!-- <div class="bottom-list" :class = "{'unCur':show != 5,'cur':show == 5}" style="height: 1.92rem;">
          <div>
            <div class="L-info w4">
              <div class="L-info-box">
                <div class="L-info-box-l">服务价格：</div>
                <div class="L-info-box-r">199元/年</div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">服务内容：</div>
                <div class="L-info-box-r">家庭内热水器维修,<span style="font-weight: bold;">每次服务减免用户维修费用300元。附赠为期一年100万燃气责任险。</span></div>
              </div>
              <div class="L-info-box">
                <div class="L-info-box-l">注意事项：</div>
                <div class="L-info-box-r">
                  1. 不含安装服务 <br>
                  2. 服务价格不含服务过程中需要使用及更换的耗材及配件费用
                </div>
              </div>
            </div>
            <a class="btn btn-2" style="margin: .1rem auto;display: block;" @click="isHasP(5)">立即购买</a>
          </div>
        </div> -->
      </li>
      <!-- 家庭电器清洗 -->
      <li>
        <div class="top-list">
          <img src='../assets/images/p_pic_6.png' alt="">
          <div class="t1">家庭电器清洗</div>
          <div class="t2">
            <span>冰箱</span>
            <span>空调</span>
            <span>洗衣机</span>
            <span>油烟机</span>
          </div>
          <div class="btn btn-1" @click='showList(6)'>
            点击查看
          </div>
        </div>
        <div class="bottom-list" :class = "{'unCur':show != 6,'cur':show == 6}" style="height: 1rem;">
          <p style="font-size: .22rem;line-height: 1rem; text-align: center;">敬请期待......</p>
        </div>
      </li>
    </ul>
    <van-popup v-model="txtShow" class='my-popup' prevent-scroll>
      <!-- <div class="t">维修项目</div> -->
      <div class="c">
        <h3>家用电器维修</h3>
        <p>电视机、空调、电冰箱、洗衣机、热水器 <br>  油烟机、燃气灶、等各类家用大小家电</p>
        <h3>门窗家具维修</h3>
        <p>家具五金、门窗配件、门窗插销 <br> 扣件活栓、拉手滑轮、窗帘轨道 </p>
        <h3>生活五金维修</h3>
        <p>龙头花洒、水管阀门、厨卫管件<br> 灯具灯泡、开关插座、合页轨道</p>
      </div>
      <a class="btn btn-1" @click="txtShow = false">确定</a>
    </van-popup>
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
        txtShow:false, //家电弹窗
        show : 0 , //那个展开
        listTop: 0, //top值位移
        isLoad:false,
      }
    },
    components:{
      cFooter
    },
    created(){
      // console.log('home运行')
      //是否购买过服务
      this.isLoad = true;
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
      showList(n){
        if(this.show == n){
          this.show = 0;          
        }else{
          this.show = n;
          this.goTo((n-1)*170);
        }
      },
      //滚动
      goTo(target){
          var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
          if (scrollT > target) {
              var timer = setInterval(function(){
                  var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
                  var step = Math.floor(-scrollT/8);
                  document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                  if(scrollT <= target){
                      document.body.scrollTop = document.documentElement.scrollTop = target;
                      clearTimeout(timer);
                  }
              },10)
          }else if(scrollT < target){
              var timer = setInterval(function(){
                  var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
                  var scrollH = document.body.scrollHeight || document.documentElement.scrollHeight;
                  var v_h = window.screen.height;
                  if(scrollT <= 10){
                    var step = 10;
                  }else if(scrollT < 100){
                    var step = Math.floor(scrollT/4);
                  }else{
                    var step = Math.floor(scrollT/8);
                  }
                  document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                  //如果到达目标，或者已经到达滚动最大值，
                  if(scrollT >= target || scrollT >= scrollH - v_h){
                      document.body.scrollTop = document.documentElement.scrollTop = target;
                      clearTimeout(timer);
                  }
              },10)
          }else if(target == scrollT){
              return false;
          }
      },
      isHasP(n){
        let globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '加载中...'
        });
        let hasAdd = false;
        //判断是否有地址的历史记录
        this.$http.get(`${BASE_URL}/fnw/get/UserAddressList/${localStorage.getItem('phone')}`).then((res)=>{
          if(res.data.data.length){
            hasAdd = true;
          }
          //是否有正在使用的服务
          this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}`).then((res)=>{
            if(res.data.data){
              this.$toast.fail('您有未完成的服务，请等待核销后再购买~');
            }else{
              if(n==3){
                // 是否有已购买360的服务
                this.$http.get(`${BASE_URL}/fnw/get/User360Order/${localStorage.getItem('phone')}`).then((res)=>{
                  globalToast.clear();
                  if(res.data.data.length){
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
              }else{
                globalToast.clear();
                if(hasAdd){
                  this.$router.push({ name: 'addSelect', params:{type:n}});
                }else{
                  this.$router.push({ name: 'buy_before', params:{type:n}});
                }
              }
            }
          })
        })
        
      }
    }
   
  }
</script>

<style scoped>
  .home{padding-bottom: .55rem;min-height: 100vh;}
  .list{padding-bottom:.20rem;}
  .list li{margin-bottom: 10px;}
  .top-list{background: #fff;position: relative;text-align: right;height: 1.6rem;padding: .15rem;}
  .top-list img{position: absolute;height: 80%;left: .1rem; top: 10%;}
  .top-list .t1{font-size: .24rem;line-height: 2;color:#5f9dea;}
  .top-list .t2 span{display:inline-block; background:#5f9dea;color: #fff;padding: 2px 5px;border-radius: 5px;}
  .top-list .btn{position: absolute;right: .15rem;bottom: .15rem;}
  .bottom-list{background: #cbe2ff;transition: all .4s ease;-webkit-transition: all .4s ease;overflow: hidden;}
  .bottom-list > div{padding: .1rem;}
  .bottom-list.unCur{height: 0 !important;}
  .bottom-list.cur{height: auto;}
  .bottom-list .L-info{font-size: .12rem;}
  .bottom-list .L-info-box-l{font-weight: bold;}

  .btn{display: inline-block;height: .36rem;line-height: .36rem;text-align: center;border-radius: .05rem;font-size: .16rem;font-weight: bold;}
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
