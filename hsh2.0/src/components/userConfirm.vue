<template>
  <div class="userConfirm">
    <div class="stit m-10">服务信息</div>
			<div class="box box1">
				<div class="box-t my-field list-field">
					<van-field :value="card_id" label="工单编号：" disabled></van-field>
					<van-field :value="confirm_info.name" label="用户姓名：" disabled></van-field>
					<van-field :value="confirm_info.mobile?confirm_info.mobile:confirm_info.phone" label="手机号码：" disabled></van-field>
					<van-field :value="confirm_info.address" label="用户地址：" type="textarea" autosize disabled rows='1'></van-field>
					<van-field v-if="confirm_info.cat_id==1||confirm_info.cat_id==2" :value="confirm_info.cat_name" label="服务类型：" disabled></van-field>
					<van-field v-else :value="confirm_info.cat_name + '维修'" label="服务类型：" disabled></van-field>
				</div>
				<div style="border-bottom:1px solid #ccc;margin:10px 0;"></div>
				<div class="box-b my-field list-field">
					<van-field :value="confirm_info.ask_time | get_Date_HMS" label="服务请求时间：" class="w6" disabled></van-field>
					<van-field :value="confirm_info.work_start_time | get_Date_HMS" label="服务承接时间：" class="w6" disabled></van-field>
					<van-field :value="confirm_info.work_end_time | get_Date_HMS" label="服务完成时间：" class="w6" disabled></van-field>
				</div>
				<div style="border-bottom:1px solid #ccc;margin:10px 0;"></div>
				<div class="box-b my-field list-field">
					<van-field :value="worker_info.true_name" label="服务人员姓名：" class="w6" disabled></van-field>
					<van-field :value="confirm_info.worker_num" label="服务人员工号：" class="w6" disabled></van-field>
					<van-field :value="worker_info.mobile" label="服务人员电话：" class="w6" disabled></van-field>
				</div>
			</div>
			<div class="stit m-10">服务结果</div>
			<div class="box box2">
				<ul style="font-weight:bold;">
					<li v-if="confirm_info.service_result == 0">已修复，未更换配件</li>
					<li v-else-if="confirm_info.service_result == 1">已修复，并更换配件</li>
					<li v-else-if="confirm_info.service_result == 2">未修复，用户主动放弃修复</li>
					<li v-else-if="confirm_info.service_result == 3">未修复，故障无法排除</li>
				</ul>
				<div v-if="confirm_info.service_info" style="margin-top:5px;font-size:.12rem;">备注：{{confirm_info.service_info}}</div>
			</div>
			<van-cell-group style="margin-top:10px;" class="money" v-if="confirm_info.cat_id != 1 && confirm_info.cat_id != 2">
				<van-cell title="服务费总金额：" :value="confirm_info.service_total_money | getM"></van-cell>
				<van-cell title="平台补贴金额：" :value="('- ' + (confirm_info.service_subsidy_money ? confirm_info.service_subsidy_money : 0)) | getM"></van-cell>
				<van-cell title="最终支付金额：" :value=" pay_money | getM "></van-cell>
			</van-cell-group>
			<div class="stit m-10" v-if="confirm_info.cat_id != 1 && confirm_info.cat_id != 2">服务现场照片</div>
			<div class="m-10" v-if="confirm_info.cat_id != 1 && confirm_info.cat_id != 2">
				<my-upload :pic-up="picUp" ind='0' txt='师傅和服务现场合照' @childget='getImg'></my-upload>
				<p class="prompt">提示：请您上传师傅和服务现场合照，以保障后续服务跟踪。</p>
			</div>
			<div class="stit m-10" v-if="pay_money != 0">支付方式</div>
			<van-radio-group v-model="pay_type" v-if="pay_money != 0">
				<van-cell-group>
					<van-cell title="微信">
						<van-radio name="0"></van-radio>
					</van-cell>
					<!-- <van-cell title="现金">
						<van-radio name="1"></van-radio>
					</van-cell> -->
				</van-cell-group>
			</van-radio-group>
			<div class="p-10" style="margin: 30px 0 20px;text-align:center;">					
				<van-button class='btn-primary' size="large" @click="next">下一步</van-button>
			</div>
  </div>
</template>

<script>
import myUpload from "./comp/myupload";
import BASE_URL from '../constants';
export default {
  name: "userConfirm",
  data() {
    return {
      globalToast: null, //加载弹窗
      confirm_info: {}, //订单详情
      worker_info: {}, //接单工人信息
      pay_money: 0, //实际支付
      pay_type: null, //支付方式
      card_id: '', //订单ID
      picUp: { //图片上传的属性
        url: '',
        name: 'photo'
      },
      imgs: [] //图片
    };
  },
  components: {
    myUpload
  },
  filters: {
		//金钱
		getM: function getM(m) {
			return m + ' 元';
    },
  },
  created: function created() {
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: '加载中...'
    });
		//获取订单信息
		this.card_id = this.$route.query.card_id;
		this.$http.get(`${BASE_URL}/fnw/get/processingService/${localStorage.getItem('phone')}?card_id=${this.card_id}`).then((res)=>{
			if(res.data.data.status_code == 10){
				this.confirm_info = res.data.data;
				this.worker_info = res.data.data.worker_info;
				var pay = this.confirm_info.service_total_money - ( this.confirm_info.service_subsidy_money ? this.confirm_info.service_subsidy_money : 0 );
				this.pay_money = pay >= 0 ? pay : 0;
			}
			this.globalToast.clear();
		});
		//支付回调
		if(this.$route.query.isPay){
			this.$dialog.confirm({
				title: '支付确认',
				message: '请确认微信支付是否已完成？',
				cancelButtonText:'重新支付',
				confirmButtonText:'已完成',
			}).then(() => {
				//确认是否完成
				this.$http.get(`${BASE_URL}/fnw/get/CheckUserPayedService/${localStorage.getItem('phone')}?card_id=${this.card_id}`).then((res)=>{
					if(res.data.res){
						this.$router.replace({ name: 'rate', query:{card_id:this.card_id}});
					}else{
						this.$toast.fail('订单未支付成功，请重新支付！');
					}
				})
			}).catch(()=>{

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
    //从组件获取img数据
		getImg: function getImg(i, url) {
			this.imgs[i] = url;
		},

		//下一步
		next: function next() {
			//上传的照片(疏通开锁不需要)
			if(this.confirm_info.cat_id != 1 && this.confirm_info.cat_id != 2){
				if (!this.imgs.length) {
					this.$toast.fail('请上传师傅和服务现场合照！');
					return false;
				}
			}
			//支付方式
			if(this.pay_money){
				if (!this.pay_type) {
					this.$toast.fail('请选择支付方式');
					return false;
				};
				// 如果测试
				if(this.confirm_info.name == '测试'){
					this.pay_money = 0.01;
				}
			}
			//验证通过，提交数据
			this.globalToast = this.$toast.loading({
				duration: 0, // 持续展示 toast
				mask: true, //背景层
				forbidClick: true, // 禁用背景点击
				message: '提交中...'
			});
			//提交服务结果
			var datas = {
				id: this.card_id,
				service_pay_money: this.pay_money,
				scene_img: this.imgs[0],
				url: window.location.href
			};
			this.$http.post(`${BASE_URL}/fnw/post/ServicePay/${localStorage.getItem('phone')}`,datas).then((res)=>{
				if(res.data.res){
					if(res.data.data == 1){
						//如果不需要付钱
						this.$router.replace({ name: 'rate', query:{card_id:this.card_id}});
					}else{
						//需要付钱
						window.location.href = res.data.data[0] + '&redirect_url=' + encodeURIComponent(location.href+'&isPay=1');;
					}
					this.globalToast.clear();
				}else{
					this.$dialog.alert({
							title: '温馨提示',
							message: '该订单已支付！',
					}).then(() => {
						this.$router.replace({ name: 'rate', query:{card_id:this.card_id}});
					})
				}
			})
		}
  }
};
</script>

<style scoped>
  #app{min-height: 100vh;overflow: hidden;}
  .box{padding:15px;background: #fff}
  .box1 .my-field.list-field.box-b .van-field .van-cell__title{width:104px;}
  .box1 .my-field.list-field.box-b .van-cell__text{width: 85px;}
  .money .van-cell__value{color: #489ef0;}
  .money .van-cell:last-child .van-cell__value{font-weight: bold;}
  .van-cell .van-radio__input{float: right;position: static;}
  .van-cell .van-radio__label{margin-left: 0;}
</style>
