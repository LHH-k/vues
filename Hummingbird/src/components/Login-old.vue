<template>
	<div class="loginWraper">
		<div class="top">
			<div class="l">
				<img src="../assets/images/logo-l.png" alt="" />
			</div>
			<div class="r">
				<p>服务中心热线：400-8084-989</p>
				</p>技术中心热线：400-9004-114</p>
			</div>
		</div>
		<div class="box">
			<div class="log-box bottom-shadow">
				<div class="t">
					<span :class="{'active':style==1}" @click="style=1">微信登陆</span>
					<span :class="{'active':style==2}" @click="style=2">账号密码登陆</span>
				</div>
				<div class="b">
					<div v-show="style==1" style="text-align: center;">
						<img src="../assets/images/login-ewm.png" alt="" style="width:50%;margin: 40px auto 5px;display: block;"/>
						<span>请使用微信扫描二维码登陆</span>
					</div>
					<div v-show="style==2" style="margin-top: 22px;">
						<el-form ref="loginForm" :model="loginForm" :rules="rules">
							<el-form-item prop="user">
								<el-input v-model="loginForm.user" placeholder="请输入账号" prefix-icon="iconfont1 icon1-renwu"></el-input>
							</el-form-item>
							<el-form-item prop="psd">
								<el-input type="password" v-model="loginForm.psd" placeholder="请输入密码" prefix-icon="iconfont1 icon1-mima"></el-input>
							</el-form-item>
							<el-button type="text">账号注册</el-button>
							<el-form-item>
								<el-button type="primary" style="width: 100%;"  @click="submitForm('loginForm')">立 即 登 录</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<p><img src="../assets/images/picc.png" alt="" />中国人保财险互联网平台专用管理系统®</p>
			<p>ICP证：沪B2-20150087</p>
		</div>
	</div>
</template>
<style scoped>
	.loginWraper{height: 100vh;}
	.top{padding: 20px 80px;overflow: hidden;background: #fff;}
	.top img {height: 46px;}
	.top .l{float: left;}
	.top .r{float: right;font-size:16px ;line-height: 23px;}
	.box{height: 80%;position: relative;background-image:url(../assets/images/login-bg.jpg);background-size:cover;background-position:center center;}
	.log-box{background: #fff;border-radius: 10px;width: 360px;height: 360px; padding: 20px 10px;position: absolute;right: 10%;top: 50%;transform: translateY(-50%);}
	.log-box .t{font-size: 0;}
	.log-box .t span{display: inline-block;width: 50%;font-size: 16px;color: #999;border-bottom: 1px solid #cfcdcd;text-align: center;padding:10px 0 20px;cursor: pointer;}
	.log-box .t span.active{color: #333;border-color: #188ecf;}
	.bottom{text-align: center;font-size: 16px;line-height: 24px;padding-top: 30px;}
	.bottom img{height: 14px;vertical-align:middle;margin-right: 10px;margin-top: -2px;}
	/*.el-input{margin-top:20px;}*/
	.el-input.is-active .el-input__inner i, .el-input__inner:focus i{color: #409EFF;}
</style>
<script>
	import router from '../router';
	import {GETTOKEN} from '../constants'; 
	
	export default{
		name:"login",
		data(){
			var Vpsd = (rule, value, callback) => {
		        if (!value) {
	          		callback(new Error('请输入密码'));
	        	}else{
	        		callback()
	        	}
	      	};
			return{
				style:1,
				loginForm:{					
					user:'lanfd@123.com',
					psd:'123123',
				},
				rules: {
					user: [
					    { required: true, message: '请输入账号', trigger: 'blur' },
					],
					psd:[
					  	{ required: true, validator:Vpsd, trigger: 'blur' }, 
					]
 				},
 			
 			}
 		},
 		created(){
 			let params = this.$route.params.error;
   			if(params){
   				this.$notify.error({
		          	title: '错误',
		          	message: params
		        });
   			}
 		},
	 	mounted: function() {
		 		this.$nextTick(function() {
		 			this.init();
		 		}.bind(this))
		 	},
		 	methods: {
		 		init() {
		
		 		},
		 		submitForm(formName) {
		 			this.$refs[formName].validate((valid) => {
		 				if(valid) {
		 					this.$http.post(GETTOKEN, {
							    grant_type: 'password',
							    client_id: '2',
							    client_secret: '0Q2ohxZTAIdXGmDPP9WJVnfoJObrd5SRPz6SynTj',
							    username : this.loginForm.user,
							    password : this.loginForm.psd,
						  	})
						  	.then((res) => {
    		 					localStorage.setItem("tokens",JSON.stringify(res.data));
    		 					router.replace("/home/");
						  	})
						  	.catch((error) =>{
						  		this.$notify.error({
						          	title: '错误',
						          	message: '账号或用户名错误！'
						        });
						  	});
		 				} else {
		 					console.log('error submit!!');
		 					return false;
		 				}
		 			});
		 		},
		
		 	}
	 	}
</script>