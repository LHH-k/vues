<template>
	<div class="loginWraper">
		<div class="boxs all-shadow">
	  		<div class="l"></div>
	  		<div class="r">
	  			<h2 style="font-size: 32px;font-weight: normal;text-align: center;line-height:4;">欢迎登陆蜂鸟系统</h2>
		  		<el-form ref="loginForm" :model="loginForm" :rules="rules">
					<el-form-item prop="user">
						<el-input v-model="loginForm.user" placeholder="请输入账号" ></el-input>
					</el-form-item>
					<el-form-item prop="psd">
						<el-input type="password" v-model="loginForm.psd" placeholder="请输入密码" ></el-input>
					</el-form-item>
					<el-button class="login-btn" @click="submitForm('loginForm')">登 录</el-button>
					<div style="text-align: center;">
						还没有账号？请 <router-link type="text" style="font-size: 16px; color: #4772A5;font-weight: bold;" :to='{name:"register"}'>立即注册</router-link>
					</div>
				</el-form>
		  	</div>
		</div>
	</div>
</template>
<style>
	.loginWraper{height: 100vh;position: relative;}
	.loginWraper .boxs{width: 1040px;height: 560px;position: absolute;left: 50%;top: 50%;transform: translate(-50% , -50%);border-radius: 20px;overflow: hidden;}
	.loginWraper .boxs > div{width: 50%;float: left;height: 100%;}
	.loginWraper .boxs .l{position: relative;background:url(../assets/images/new-logo.png) no-repeat center center;}
	.loginWraper .boxs .r{height: 100%;padding: 40px;}
	.loginWraper .el-form-item{margin-bottom: 30px;}
	.loginWraper .el-input__inner{height: 50px;border-radius: 50px;font-size: 16px;padding: 0 20px;}
	.loginWraper .el-form-item__error{left: 20px;}
	.loginWraper .r .login-btn{width: 100%; background: #4772a5;border-color:#4772a5;color: #fff;height: 50px;border-radius: 50px;font-size: 16px;margin: 30px 0 10px;}
	.loginWraper .el-input.is-active .el-input__inner i, .el-input__inner:focus i{color: #4772a5;}
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