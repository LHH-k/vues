<template>
  <div class="bjk-360">
    <div>
        <van-cell-group style="margin-bottom:10px" class="icon-field">
          <van-icon name="contact"></van-icon>
          <van-field v-model="form.user" label="" placeholder="请填写您的真实姓名"></van-field>
        </van-cell-group>
        <p class="prompt">*请务必填写真实姓名，以免影响您正常使用服务。</p>
        <van-cell-group style="margin-bottom:10px" class="icon-field">
          <i class="iconfont icon-shouji" style="font-size:.26rem;left:12px;margin-top:-.13rem;"></i>
          <van-field v-model="form.phone" label="" placeholder="请填写您的手机号码"></van-field>
        </van-cell-group>
        <van-cell-group style="margin-bottom:10px"  class="yzm icon-field">
          <i class="iconfont icon-yduiyanzhengma"></i>
          <van-field v-model="form.yzm" label="" placeholder="请填写您的手机验证码"  class="icon-field"></van-field>
          <span id="getCode" @click="getPhoneCode" :class="{'dis':!isGet}">获取验证码</span>
        </van-cell-group>
        <van-cell-group style="margin-bottom:10px"  class="icon-field">
          <van-icon name="location"></van-icon>
          <van-field v-model="form.adds" class='add' label="" placeholder="请选择您居住的省、市、区/县" @focus="addsShow = true" readonly></van-field>
        </van-cell-group>
        <p class="prompt">*部分地区服务未覆盖，请见谅。</p>
        <van-cell-group style="margin-bottom:10px"  class="icon-field">
          <van-icon name="location"></van-icon>
          <van-field v-model="form.add1"  class='add noLabel'  label=" " placeholder="请填写用户的详细地址" ></van-field>
        </van-cell-group>
        <van-cell-group style="margin-bottom:10px"  class="icon-field">
          <van-icon name="location"></van-icon>
          <div class='add adds van-cell van-hairline'>
            <input type="text" v-model="form.add2"/> <span style="margin:0 5px 0 3px"> 栋 </span> 
            <input type="text" v-model="form.add3"/> <span style="margin:0 5px 0 3px"> 单元 </span>  
            <input type="text" v-model="form.add4"/> <span style="margin:0 5px 0 3px"> 层 </span>
            <input type="text" v-model="form.add5"/> <span style="margin:0 5px 0 3px"> 号 </span>
          </div>
        </van-cell-group>
        <p class="prompt">*请务必填写真实地址，以免影响您正常使用服务。</p>
        <van-cell-group style="margin-bottom:10px" class="icon-field">
          <van-icon name="sign"></van-icon>
          <van-field v-model="form.cardNum" label="" placeholder="请填写卡号"></van-field>
        </van-cell-group>
        <van-cell-group style="margin-bottom:10px" class="icon-field">
          <van-icon name="password-not-view"></van-icon>
          <van-field v-model="form.cardPwd" label=""  type="password" placeholder="请填写密码"></van-field>
        </van-cell-group>
        <p class="prompt">*卡号密码请查看扫码卡片。</p>
    </div>
    <div style="text-align:center;margin:20px 0;color:#7e7e7e;">
      <van-checkbox v-model="isCheck">我已认真阅读并接受<router-link to='/fnwtext'>用户协议</router-link></van-checkbox>
    </div>
    <div class="p-10" style="margin: 20px 0;text-align:center;">					
      <van-button class='btn-primary' size="large" @click="goNext($route.params.type)" :disabled='!isCheck'>确 认</van-button>
    </div>
    <van-popup v-model="addsShow" position="bottom" :close-on-click-overlay='false'>
      <van-area :area-list="addselect" @cancel="onCancel" @confirm="addSelect" :columns-num="3" title="服务地区" ></van-area>
    </van-popup>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'bjk-360',
    data () {
      return {
        globalToast: null,
        isCheck: true, //个人须知是否阅读
        isGet: true, //是否获取验证码
        addsShow: false, //居住地址显示
        product_id : 2, //呼叫类型
        form: {
          user: '',
          phone: '',
          yzm: '',
          adds: "", //城市区域
          add1: "", //街道、小区
          add2: "", //栋
          add3: "", //单元
          add4: "", //层
          add5: "", //号
          address: "", //详细地址
          IDcard: '',//身份证
          cardNum:null, //激活卡号
          cardPwd:null, //激活密码
        },
        addselect : [],
      }
    },
    created(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
      //获取可选服务地址
      this.$http.get('./static/data/area-has360.json').then((res)=>{
        this.addselect = res.data;
        this.globalToast.clear();
      });
    },
    mounted() {
      //生命周期
      this.$nextTick(function () {

      });
    },
    methods:{
      //获取验证码
      getPhoneCode: function getPhoneCode() {
        var _this4 = this;
        //检验手机号码
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        //是否可以发送
        if (this.isGet) {
          if (!regPhone.test(this.form.phone)) {
            this.$toast.fail('请填写正确的手机号码!');
          } else {
            this.isGet = false;
            //获取验证码
            this.$http.get('//wx.funlifeday.com/web/wechat/user/get/phoneCode/' + this.form.phone).then(function (res) {
              if (res.data.res) {
                _this4.$toast.success('验证码已发送，请注意查收！');
                setTimeout(function () {
                  _this4.isGet = true;
                }, 60000);
              } else {
                _this4.isGet = true;
                _this4.$toast.fail('验证码发送失败，请联系客服！');
              }
            }).catch(function (err) {
              console.log(err.message);
            });
          }
        } else {
          this.$toast.fail('验证码已发送，请在60秒后重新获取!');
        }
      },
      // 选择服务区域
      addSelect: function onConfirm(value) {
        var add = '';
        for (var i = 0; i < value.length; i++) {
          if (value[i].code == -1) {
            this.$toast('地址选择错误!');
            return false;
          } else {
            add += value[i].name + '';
          }
        }
        this.form.adds = add;
        this.addsShow = false;
      },
      onCancel(){
        this.addsShow = false;
      },
      // 下一步
      goNext(t){
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: '提交中...'
        });
        // 姓名
        var regName = /^[\u4e00-\u9fa5]{2,}$/;
        var regN2 = /某某|女士|先生|师傅|师父|小姐/;
        if (!regName.test(this.form.user)) {
          this.$toast.fail("请输入真实中文姓名！");
          return false;
        } else if (regN2.test(this.form.user)) {
          this.$toast.fail("请输入正确的真实姓名！");
          return false;
        }
        //手机
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.form.phone)) {
          this.$toast.fail("请输入正确的手机号码！");
          return false;
        }
        if (!this.form.yzm) {
          this.$toast.fail("请输入手机验证码！");
          return false;
        }
        //省市区
        if(!this.form.adds){
          this.$toast.fail("请选择您居住的省/市/区！");
          return false;
        }
        //详细地址
        if(!this.form.add1){
          this.$toast.fail("请填写详细地址！");
          return false;
        }
        //门牌号
        if(!this.form.add5){
          this.$toast.fail("请填写您的具体门牌号");
          return false;
        }else{
          let regAdd = /^[a-zA-Z\d]{1,}$/;
          if(!regAdd.test(this.form.add5)){
            this.$toast.fail("请填写正确的门牌号");
            return false;
          }
        }
        //激活卡号
        if(!this.form.cardNum){
          this.$toast.fail("请填写卡号！");
          return false;
        }
        //激活密码
        if(!this.form.cardPwd){
          this.$toast.fail("请填写密码！");
          return false;
        }
        //验证验证码正确性
        this.$http.get("//wx.funlifeday.com/web/wechat/user/get/phoneCodeCheck/" + this.form.phone +"?code=" +this.form.yzm).then((res)=>{
          if (res.data.res) {
            //新地址提交
            let adds = {
              name:	this.form.user,	
              mobile: this.form.phone ,
              address: `${this.form.adds}${this.form.add1}${this.form.add2?this.form.add2+'栋':''}${this.form.add3?this.form.add3+'单元':''}${this.form.add4?this.form.add4+'层':''}${this.form.add5+'号'}`,
            };
            this.$http.post(`${BASE_URL}/fnw/post/NewUserAddress/${localStorage.getItem('phone')}`,adds).then((res)=>{
              if(res.data.res){
                let data = res.data.data;
                //家庭维修直接生成新订单
                let datas = {
                  name:	data.name,	
                  id_card: '',
                  address: data.address,
                  phone: data.mobile ,
                  product_id : this.product_id,
                  cat_id : '',
                  num:this.form.cardNum,      //保洁卡才会用的一元购卡号密码
                  secret:this.form.cardPwd
                };
                // 添加订单
                this.$http.post(`${BASE_URL}/fnw/post/NewOrder/${localStorage.getItem('phone')}`,datas).then((res1)=>{
                  if(res.data.res){
                    this.$router.replace({ name: 'pay', params: { type:3} , query:{order_id:res1.data.data,isOne:1}});
                    this.globalToast.clear();
                  }else{
                    this.$toast.fail('该地址已存在订单，请勿重复购买！如有未支付订单，请到‘我的-未支付订单’中支付！');
                  }
                })
              }
            });
          } else {
            this.$toast.fail("手机号码或者验证码错误!");
            return false;
          }
        })
      },
    }
   
  }
</script>

<style>
  .bjk-360{background: #fff;padding:20px 10px;min-height: 100vh;}
  .bjk-360 .prompt{padding: 0 .2rem;}
  .bjk-360 .van-cell{padding:.1rem .15rem;}
  .bjk-360 .add input {box-sizing: border-box;}
  .bjk-360 .adds { padding-left: .5rem;}
  .bjk-360 .adds input {width: .45rem;}
  .bjk-360 .icon-field .van-cell__value{padding-left: .35rem;}
  @media only screen and (max-width: 320px) {
    .bjk-360 .adds input { width: .38rem;}
  }
  .bjk-360 .van-checkbox__icon { width: 18px; height: 18px; }
  .bjk-360 .van-checkbox__icon {line-height: 18px;}
</style>
