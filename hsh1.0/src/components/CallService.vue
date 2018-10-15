<template>
  <div class="BOXS callService" v-if="userInfo">
    <div class="box box1">
      <div class="stit m-10">服务信息</div>
      <div class="box-c bg-white my-field">
        <van-cell-group>
          <van-field :value="form.user" label="姓　　名：" readonly></van-field>
          <van-field :value="form.phone" label="电　　话：" readonly></van-field>
          <van-field v-model="form.IDcard" label="身份证号：" placeholder="请输入您的身份证号"></van-field>
          <van-field v-if="hash==3" v-model="form.service.name" label="维修项目：" placeholder="请选择您需要维修的项目" @focus="addsShow = true" readonly ></van-field>
          <van-field v-else :value="form.service.name" label="维修项目：" disabled></van-field>
          <van-field :value="form.address" class='add' label="服务地址：" readonly autosize type="textarea" rows="1"></van-field>
          <van-field v-if="hash==3" v-model="form.describe" type="textarea" label="故障描述：" placeholder="故障描述..." autosize></van-field>
        </van-cell-group>
      </div>
      <van-popup v-model="addsShow" position="bottom" :close-on-click-overlay='false'>
        <van-picker :columns="canServices" @cancel="onCancel" @confirm="serviceChange" show-toolbar value-key='cat_name'></van-picker>
      </van-popup>
    </div>
    <div class="box box2" v-if="hash==3">
      <div class="stit m-10">故障处图片</div>
      <div class="box-c m-10">
        <my-upload ind='0' txt='故障处照片' @childget='getImg'></my-upload>
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
          <li><span>服务地址：</span><span>{{form.address}}</span></li>
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
import myUpload from "./comp/myupload";
import BASE_URL from '../constants';
export default {
  name: "callService",
  data() {
    return {
      globalToast: null,
      userInfo : null ,//指定ID的地址信息
      isCheck: true, //个人须知是否阅读
      nickname: "", //昵称
      hash: null, //hash值判断类型
      order_id: "", //订单id
      form: {
        user: "", //用户姓名
        phone: null, //手机号
        address: "", //地区

        IDcard: "", //身份证
        service: {
          id: "", //维修的cat_id
          name: "" //维修的项目名称
        },
        describe: "", //故障描述
        imgs: [] //故障图片
      },
      addsShow: false, //选中服务的弹窗
      submitShow: false, //确认的弹窗
      isGet: true, //是否可以获取二维码
      canServices: [] //可以选择的服务
    };
  },
  components: {
    myUpload
  },
  created: function created() {
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: '加载中...'
    });
    this.hash = this.$route.params.type;
    if(this.hash == 1){
      this.form.service = {id:'1',name:'家庭开锁'};
    }else if(this.hash == 2){
      this.form.service = {id:'2',name:'家庭疏通'};
    }
    //获取指定ID的用户信息 维修服务的订单
    if(this.$route.query.order_id){
       this.$http.get(`${BASE_URL}/fnw/get/AvailableService/${localStorage.getItem('phone')}?order_id=${this.$route.query.order_id}`).then((res)=>{
        res.data.data.forEach((e,i)=>{
          // 筛选可选服务类型
          if(e.insure_id == 2){
            this.canServices.push(e);
          }
        })
      })
      //360通过订单填写信息
      this.$http.get(`${BASE_URL}/fnw/get/UserOrderById/${localStorage.getItem('phone')}?order_id=${this.$route.query.order_id}`).then((res)=>{
        if(res.data.res){
          this.userInfo = res.data.data;
          this.form.user = this.userInfo.name;
          this.form.phone = this.userInfo.phone;
          this.form.address = this.userInfo.address;
          this.globalToast.clear();
        }
      })
    }else if(this.$route.query.add_id){
      // 疏通开锁 通过add_id 查找信息
      this.$http.get(`${BASE_URL}/fnw/get/UserAddressList/${localStorage.getItem('phone')}?id=${this.$route.query.add_id}`).then((res)=>{
        this.userInfo = res.data.data;
        this.form.user = this.userInfo.name;
        this.form.phone = this.userInfo.mobile;
        this.form.address = this.userInfo.address;
        this.globalToast.clear();
      })
    }
    
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

    },
    //选择服务确认
    serviceChange: function serviceChange(values) {
      this.form.service.id = values.cat_id;
      this.form.service.name = values.cat_name;
      this.addsShow = false;
    },
    //取消
    onCancel: function onCancel(){
      this.addsShow = false;
    },

    //从组件获取img数据
    getImg(i, url) {
      this.form.imgs[i] = url;
    },

    //表单验证
    formV: function formV() {
      if(this.form.IDcard){
        if(!this.$IDcardValid(this.form.IDcard)){
          this.$toast.fail("请填写正确的身份证号码！");
          return false;
        }
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
      this.submitShow = true;
    },

    //最后提交表单
    submit() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "呼叫服务中..."
      });
      //如果是360呼叫
      if(this.hash==3){
        let datas = {
          order_id : this.$route.query.order_id,
          cat_id:this.form.service.id,
          describe: this.form.describe,
          call_img: this.form.imgs[0]
        };
        //360等其他产品会直接呼叫
        this.$http.post(`${BASE_URL}/fnw/post/serviceOn/${localStorage.getItem('phone')}`,datas).then((res)=>{
          if(res.data.res){
            this.globalToast.clear();
            this.$router.replace({ name: 'success', params: { type:'call'}});
          }
        })
      }else{
        let datas = {
          name:	this.form.user,	
          id_card: this.form.IDcard,
          address: this.form.address,
          phone: this.form.phone ,
          product_id : 1,
          cat_id : this.form.service.id,
        };
        //生成疏通开锁订单不呼叫，支付完才呼叫
        this.$http.post(`${BASE_URL}/fnw/post/NewOrder/${localStorage.getItem('phone')}`,datas).then((res)=>{
          if(res.data.res){
            this.globalToast.clear();
            this.$router.replace({ name: 'pay', params: { type:this.hash } , query:{order_id:res.data.data}});
          }else{
            this.$toast.fail('该地址已存在订单，请勿重复购买！如有未支付订单，请到‘我的-未支付订单’中支付！');
          }
        }).catch((res)=>{})
      }
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
