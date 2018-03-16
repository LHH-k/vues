<template>
	<div class="register-1">
		<el-form :model="Form2" :rules="rules2" ref="Form2" label-width="120px" class="register-form1">
		  	<el-form-item label="商家名称：" prop="user">
				<el-input v-model="Form2.user" placeholder="请填写营业执照上的名称"></el-input>
			</el-form-item>
			<el-form-item label="证件号码：" prop="id_card">
				<el-input v-model="Form2.id_card" placeholder="请填写营业执照上的号码"></el-input>
			</el-form-item>
			<el-form-item label="联系电话：" prop="phone">
				<el-input v-model="Form2.phone" placeholder="请填写正确的联系电话，便于告知申请结果"></el-input>
			</el-form-item>
			<el-form-item label="公司地址：" prop="company_adds" class="server-adds">
				<el-select v-model="Form2.company_adds.province" placeholder="省份">
			      	<el-option label="四川省" value="1"></el-option>
			      	<el-option label="重庆市" value="2"></el-option>
			    </el-select>
			    <el-select v-model="Form2.company_adds.city" placeholder="城市">
			      	<el-option label="商家1" value="1"></el-option>
			      	<el-option label="商家2" value="2"></el-option>
			    </el-select>
				<el-input v-model="Form2.company_adds.country" placeholder="请填写详细地址" style="margin-top: 15px;"></el-input>
			</el-form-item>
		  	<el-form-item label="服务内容：" prop="services">
				<el-checkbox-group v-model="Form2.services">
				    <el-checkbox label="家庭开锁"></el-checkbox>
				    <el-checkbox label="家庭疏通"></el-checkbox>
				    <el-checkbox label="家电维修"></el-checkbox>
			  	</el-checkbox-group>
			</el-form-item>
			<el-form-item label="开锁资质：" prop="pic_can_unlocking">
				<el-upload
				  class="pic-uploader"
				  action="http://wx.funlifeday.com/web/wechat/server/uploadImg"
				  :show-file-list="false"
				  :on-success="handlePicSuccess3"
				  :on-error="picUpErr"
				  :before-upload="beforePicUpload">
				  <img v-if="Form2.pic_can_unlocking" :src="Form2.pic_can_unlocking" class="pics">
				  <div v-else class="up-text">						
				  	<i class="el-icon-plus avatar-uploader-icon"></i>
				  	<p>请添加开锁资质照片</p>
				  </div>
				</el-upload>
			</el-form-item>
			<el-form-item label="服务范围：" prop="server_adds" class="server-adds">
				<el-select v-model="Form2.server_adds.province" placeholder="省份">
			      	<el-option label="商家1" value="1"></el-option>
			      	<el-option label="商家2" value="2"></el-option>
			    </el-select>
			    <el-select v-model="Form2.server_adds.city" placeholder="城市">
			      	<el-option label="商家1" value="1"></el-option>
			      	<el-option label="商家2" value="2"></el-option>
			    </el-select>
				<el-checkbox-group v-model="Form2.server_adds.country">
				    <el-checkbox label="成华区"></el-checkbox>
				    <el-checkbox label="高新区"></el-checkbox>
				    <el-checkbox label="青羊区"></el-checkbox>
			  	</el-checkbox-group>
			</el-form-item>
			
			<el-button class="mybtn" @click="submitForm('Form2')">提 交</el-button>
		</el-form>
	</div>
</template>
<style>
	
</style>
<script>
	import router from '../../router';
	
	export default{
		name:"register-1",
		data(){
	      	//身份证号码验证
			var VIDCard = (rule, value, callback) => {
				let IDreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
		        if(!IDreg.test(value)){
	        		callback(new Error('请填写正确的身份证号码'));
	        	}else{
	        		callback()
	        	}
	      	};
	      	//手机号码验证
			var Vphone = (rule, value, callback) => {
				let regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
		        if(!regPhone.test(value)){
	        		callback(new Error('请填写正确的手机号码'));
	        	}else{
	        		callback()
	        	}
	      	};
	      	//公司地址选择
	      	var Vc_adds = (rule, value, callback) => {
		        if (!value.province) {
	          		callback(new Error('请选择省份'));
	        	}else if(!value.city){
	        		callback(new Error('请选择城市'));
	        	}else if(!value.country){
	        		callback(new Error('请填写详细地址'));
	        	}else{
	        		callback()
	        	}
	      	};
	      	//服务地址选择
	      	var Vs_adds = (rule, value, callback) => {
		        if (!value.province) {
	          		callback(new Error('请选择省份'));
	        	}else if(!value.city){
	        		callback(new Error('请选择城市'));
	        	}else if(!value.country){
	        		callback(new Error('请至少选择一个地区'));
	        	}else{
	        		callback()
	        	}
	      	};
			return{
				Form2:{					
					user:'',
					id_card:'',
					phone:'',
					company_adds:{
						province:'',
						city:'',
						country:'',
					},
					services:[],
					pic_can_unlocking:'',
					server_adds:{
						province:'',
						city:'',
						country:[],
					},
				},
				rules2: {
					user: [
					    { required: true, message: '请填写营业执照上的名称', trigger: 'blur' },
					],
					id_card:[
					  	{ required: true, message: '请填写营业执照上的号码', trigger: 'blur' }, 
					],
					phone:[
					  	{ required: true, validator:Vphone, trigger: 'blur' },
					],
					company_adds:[
						{ required: true, validator:Vc_adds, trigger: 'change' },
					],
					services:[
						{ type: 'array', required: true, message: '请至少选择一个服务内容', trigger: 'change' }
					],
					pic_can_unlocking:[
						{ required: true, message: '请添加开锁资质照片', trigger: 'change' },
					],
					server_adds:[
						{ required: true, validator:Vs_adds, trigger: 'change' },
					]
 				},
 				
 			}
 		},
 		created(){
 			
 		},
	 	mounted: function() {
		 		this.$nextTick(function() {
		 			this.init();
		 		}.bind(this))
		 	},
		 	methods: {
		 		init() {
					
		 		},
		 		//图片上传成功
		 		//个人-开锁资质
		 		handlePicSuccess3(res,file){
		 			console.log(res,file);
		 			this.$message.success("开锁资质照片上传成功！");
	 				this.Form2.pic_can_unlocking = URL.createObjectURL(file.raw);
		 		},
		 		//上传失败的回调
		 		picUpErr(err){
		 			this.$message.error(err);
		 		},
		 		//图片上传前
		 		beforePicUpload(file){
					const isJPG = (file.type === 'image/jpeg'|| file.type === 'image/png');
			        const isLt2M = file.size / 1024 / 1024 < 2;
			        if (!isJPG) {
			          this.$message.error('上传的图片只能是 JPG 格式!');
			        }
			        if (!isLt2M) {
			          this.$message.error('上传的图片大小不能超过 2MB!');
			        }
			        return isJPG && isLt2M;
		     	},
		 		submitForm(formName) {
		 			this.$refs[formName].validate((valid) => {
		 				if(valid) {
		 					this.$emit("stepChang");
		 					this.$message.error('提交成功！');
		 				} else {
		 					this.$message.error('提交失败，请检查填写信息！');
		 					return false;
		 				}
		 			});
		 		},
		
		 	}
	 	}
</script>