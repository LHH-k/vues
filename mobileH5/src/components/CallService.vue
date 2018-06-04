<template>
  <div class="BOXS callService">
    <div class="box box1">
      <div class="stit m-10">服务信息</div>
      <div class="box-c bg-white my-field">
        <van-cell-group>
          <van-field v-model="form.user" label="姓　　名：" placeholder="请输入您的姓名" icon="clear" @click-icon="form.user = ''"></van-field>
          <van-field v-model="form.phone" label="电　　话：" placeholder="请输入您的手机号码"></van-field>
          <van-field v-model="form.IDcard" label="身份证号：" placeholder="请输入您的身份证号"></van-field>
          <van-field v-model="form.adds" class='add' label="服务地址：" placeholder="请选择省、市、区/县" @focus="addsShow = true" readonly></van-field>
          <van-field v-model="form.add1"  class='add noLabel'  label=" " placeholder="请填写用户的详细地址" ></van-field>
          <div class='add adds van-cell van-hairline'>
            <input type="text" v-model="form.add2"/> <span style="margin:0 5px 0 3px"> 栋 </span> 
            <input type="text" v-model="form.add3"/> <span style="margin:0 5px 0 3px"> 单元 </span>  
            <input type="text" v-model="form.add4"/> <span style="margin:0 5px 0 3px"> 层 </span>
            <input type="text" v-model="form.add5"/> <span style="margin:0 5px 0 3px"> 号 </span>
          </div>
          <van-field v-if="hash==1" value="家庭开锁" label="维修项目：" disabled></van-field>
          <van-field v-else-if="hash==2" value="家庭疏通" label="维修项目：" disabled></van-field>
          <van-field v-else-if="hash==3" v-model="form.service.name" label="维修项目：" placeholder="请选择您需要维修的项目" @focus="addsShow1 = true" readonly ></van-field>
          <van-field v-model="form.describe" type="textarea" label="故障描述：" placeholder="故障描述..." autosize></van-field>
        </van-cell-group>
      </div>
      <!-- <van-popup v-model="addsShow1" position="bottom" :close-on-click-overlay='false'>
        <van-picker :columns="canServices" @cancel="onCancel" @confirm="serviceChange" show-toolbar value-key='cat_name'></van-picker>
      </van-popup> -->
      <van-popup v-model="addsShow" position="bottom" :close-on-click-overlay='false'>
          <van-area :area-list="addselect" @cancel="onCancel(2)" @confirm="onConfirm" :columns-num="3" title="服务地区" ></van-area>
        </van-popup>
    </div>
    <div class="box box2">
      <div class="stit m-10">故障处图片</div>
      <div class="box-c m-10">
        <my-upload :pic-up="picUp" ind='0' txt='故障处照片' @childget='getImg'></my-upload>
        <p class="prompt">*上传现场照片，有利于服务人员携带合适的工具进行服务。</p>
      </div>
    </div>
    <div style="text-align:center;margin:20px 0;color:#7e7e7e;">
      <van-checkbox v-model="isCheck">我已认真阅读并接受<router-link to='/fnwtext'>用户协议</router-link></van-checkbox>
    </div>
    <div class="p-10" style="margin: 20px 0;">					
      <van-button class='btn-primary' size="large" @click="formV" :disabled='!isCheck'>下一步</van-button>
    </div>
    <van-popup v-model="submitShow" class='my-popup' prevent-scroll>
      <div class="t">服务信息确认</div>
      <div class="c">
        <ul>
          <li><span>姓　　名：</span><span>{{form.user}}</span></li>
          <li><span>电　　话：</span><span>{{form.phone}}</span></li>
          <li><span>服务地址：</span><span>{{address}}</span></li>
          <li><span>服务类型：</span><span>{{form.service.name}}</span></li>
        </ul>
        <p class="prompt" style="margin: 5px 0;">注：每次呼叫服务只能修复一处损坏。</p>
      </div>
      <div class="b">
        <a class='my-btn back' @click="submitShow = false">返回修改</a>
        <a class='my-btn go' @click="submit">发起服务</a>
      </div>
    </van-popup>
  </div>
</template>

<script>
import myUpload from "./myupload";
export default {
  name: "callService",
  data() {
    return {
      globalToast: null,
      isCheck: true, //个人须知是否阅读
      nickname: "", //昵称
      address: "", //呼叫服务地址
      hash: null, //hash值判断类型
      picUp: {
        //图片上传的属性
        // url: baseURL + '/user/post/uploadBlob',
        url: "",
        name: "photo"
      },
      order_id: "", //订单id
      form: {
        user: "", //用户姓名
        phone: null, //手机号
        adds: "", //城市区域
        add1: "", //详细地址
        add2: "", //栋
        add3: "", //单元
        add4: "", //层
        add5: "", //号

        IDcard: "", //身份证
        service: {
          id: "", //维修的cat_id
          name: "" //维修的项目名称
        },
        describe: "", //故障描述
        imgs: [] //故障图片
      },
      addsShow: false, //选中服务地区的弹窗
      addsShow1: false, //选中服务的弹窗
      submitShow: false, //确认的弹窗
      isGet: true, //是否可以获取二维码

      addselect : [], //可选发服务区域
      canServices: [] //可以选择的服务
    };
  },
  components: {
    myUpload
  },
  created: function created() {
    var _this = this;
    this.hash = this.$route.params.type;
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: '加载中...'
    });
    //获取可选服务地址
    this.$http.get('static/data/area-has.json').then((res)=>{
			this.addselect = res.data;
		});
    //获取服务地址
    // this.$http.get('/api/user/get/orderDetail/' + this.order_id).then(function (res) {
    //   _this.address = res.data.data;
    //   _this.globalToast.clear();
    // }).catch(function (err) {
    //   console.log(err.message);
    // });
    // //可选服务
    // if (this.hash == 3) {
    //   //获取可呼叫的服务
    //   axios.get(baseURL + '/user/get/availableCat/' + this.order_id).then(function (res) {
    //     if (res.data.res) {
    //       _this.canServices = [];
    //       res.data.data.forEach(function (e) {
    //         if (e.cat_id != 1 && e.cat_id != 2) {
    //           _this.canServices.push(e);
    //         }
    //       });
    //     }
    //   }).catch(function (err) {
    //     console.log(err.message);
    //   });
    // } else if (this.hash == 2) {
    //   this.form.service = { name: '家庭疏通', id: 2 };
    // } else if (this.hash == 1) {
    //   this.form.service = { name: '家庭开锁', id: 1 };
    // }

    
  },
  mounted: function mounted() {
    //生命周期
    this.$nextTick(function () {
      //实例完全插入文档
        this.cartView();
    });
  },
  methods: {
    // 初始化
    cartView: function cartView() {
      this.globalToast.clear();
    },

    //选择服务确认
    serviceChange: function serviceChange(values) {
      this.form.service.id = values.cat_id;
      this.form.service.name = values.cat_name;
      this.addsShow1 = false;
    },
    // 选择服务区域
    onConfirm: function onConfirm(value) {
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
    //取消
    onCancel: function onCancel(num){
      if(num==2){
        this.addshow = false;
      }else if(num == 1){
        this.addsShow1 = false;
      }
    },

    //从组件获取img数据
    getImg: function getImg(i, url) {
      this.form.imgs[i] = url;
    },

    //表单验证
    formV: function formV() {
      var _this4 = this;

      //姓名
      var regName = /^[\u4e00-\u9fa5]{2,}$/;
      var regN2 = /某某|女士|先生|师傅|师父/;
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
      //选择的服务
      if (this.hash == 3) {
        if (this.form.service.name == "请选择" || !this.form.service.name) {
          this.$toast.fail("请选择您需要的服务！");
          return false;
        }
        //故障图片
        if (!this.form.imgs.length) {
          this.$toast.fail("请上传故障处图片！");
          return false;
        }
      }
      //验证验证码正确性
      axios.get(
          baseURL +
            "/user/get/phoneCodeCheck/" +
            this.form.phone +
            "?code=" +
            this.form.yzm
        )
        .then(function(res) {
          if (res.data.res) {
            _this4.submitShow = true;
          } else {
            _this4.$toast.fail("手机号码或者验证码错误!");
          }
        })
        .catch(function(err) {
          console.log(err.message);
        });
    },

    //最后提交表单
    submit: function submit() {
      var _this5 = this;

      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "呼叫服务中..."
      });
      var datas = {
        order_id: this.order_id,
        name: this.form.user,
        mobile: this.form.phone,
        describe: this.form.describe,
        call_img: this.form.imgs[0]
      };
      axios
        .post(baseURL + "/user/post/serviceOn/" + this.form.service.id, datas)
        .then(function(res) {
          if (res.data.res) {
            _this5.globalToast.clear();
            window.location.href =
              "http://wx.funlifeday.com/web/wechat/user/enter/payForCall/" +
              res.data.data;
          } else {
            _this5.$toast.fail(res.data.ex);
          }
        });
    }
  }
};
</script>

<style scoped>
.add input {
  box-sizing: border-box;
}
.adds {
  padding-left: 90px;
}
.adds input {
  width: 35px;
  border: 1px solid #ddd;
}
@media only screen and (max-width: 320px) {
  .van-field .van-cell__title {
    width: 80px;
  }
  .adds input {
    width: 26px;
  }
}
.van-checkbox__icon {
  width: 18px;
  height: 18px;
}
.van-checkbox__icon {
  line-height: 18px;
}
</style>
