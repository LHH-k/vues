<template>
  <div class="buy_360">
    
    <van-cell-group style="margin-bottom:10px" class="icon-field">
      <van-icon name="contact"></van-icon>
      <van-field v-model="form.user" label="" placeholder="请填写您的真实姓名"></van-field>
    </van-cell-group>
    <p class="prompt">*请务必填写真实姓名，以免影响您正常使用服务。</p>
    <van-cell-group style="margin-bottom:10px" class="icon-field">
      <i class="iconfont icon-shouji"></i>
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
    <div style="text-align:center;margin:20px 0;color:#7e7e7e;">
      <van-checkbox v-model="isCheck">我已认真阅读并接受<router-link to='/fnwtext'>用户协议</router-link></van-checkbox>
    </div>
    <div class="p-10" style="margin: 20px 0;text-align:center;">					
      <van-button class='btn-primary' size="large" @click="goNext()" :disabled='!isCheck'>下一步</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buy_360',
    data () {
      return {
        isCheck: true, //个人须知是否阅读
        isGet: true, //是否获取验证码
		    addsShow: false, //居住地址显示
        form: {
          user: '',
          phone: '',
          yzm: '',
          adds: "", //城市区域
          add1: "", //详细地址
          add2: "", //栋
          add3: "", //单元
          add4: "", //层
          add5: "", //号
          IDcard: '',//身份证
          adds1: '', //服务城市
          areas: [], //服务区域
        },
      }
    },
    created(){
      this.type = this.$route.params.type;
    },
    components:{
      
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
            this.$https.get('/api/user/get/phoneCode/' + this.form.phone).then(function (res) {
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
      // 下一步
      goNext(){
        this.$router.replace({ name: 'pay', params: { type:'3'}});
      },
    }
   
  }
</script>

<style>
  .buy_360{background: #fff;padding:20px 10px;min-height: 100vh;}
  .buy_360 .prompt{padding: 0 20px;}
  .buy_360 .add input {box-sizing: border-box;}
  .buy_360 .adds { padding-left: 50px;}
  .buy_360 .adds input {width: 35px;}
  @media only screen and (max-width: 320px) {
    .buy_360 .adds input { width: 26px;}
  }
  .buy_360 .van-checkbox__icon { width: 18px; height: 18px; }
  .buy_360 .van-checkbox__icon {line-height: 18px;}
</style>
