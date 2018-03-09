<template>
	<div class="register">
		<div class="top">
			<img src="../assets/images/new-logo-top.png" alt="" style="margin-left: 20px;vertical-align: middle;"/>
		</div>
		<div class="content">
			<div class="c-top">
				<el-steps :active="step" align-center>
				  <el-step title="选择注册类型" ></el-step>
				  <el-step title="填写注册信息"></el-step>
				  <el-step title="申请注册成功"></el-step>
				</el-steps>
			</div>
			<div class="c-boxs">
				<div class="box box1" v-if="step==0" style="text-align: center;">
					<div style="margin: 50px 0;">
						<span style="margin-right: 20px;">注册类型：</span>
						<el-radio-group v-model="register_type">
						    <el-radio :label="1">企业商家</el-radio>
						    <el-radio :label="2">个人商家</el-radio>
					  	</el-radio-group>
					</div>
					<el-button @click="step=1" class="mybtn">下一步</el-button>
				</div>
				<div class="box box2" v-if="step==1">
					<div v-if="register_type==1">
						<register1 ref="reg1" @stepChang="step = 2"></register1>
					</div>
					<div v-else-if="register_type==2">
						<register2 ref="reg2" @stepChang="step = 2"></register2>
					</div>
				</div>
				<div class="box box3" v-if="step==2">
					<i class="el-icon-success"></i>
					<p>
						注册申请已提交，请耐心等待审核<br />
						审核结果将通过电话告知<br />
						客服咨询电话：400-8084-989
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.register{min-height: 100vh;background: #f5f5f5;}
	.register .top{height: 80px;line-height: 80px; background: #4a6da2;}
	.register .content{padding: 30px 60px;}
	.register .c-top{border: 2px solid #efefef; background: #f9f9f9;border-bottom-width: 1px;padding: 20px 0;}
	.register .c-boxs{background: #fff;min-height: 65vh;}
	.register .el-step__head.is-finish{border-color: #eb6100;color: #fff;}
	.register .el-step__head.is-finish .el-step__icon,.register .el-step__head.is-finish .el-step__line{background: #EB6100;}
	.register .el-step__head.is-process{color: #eb6100;border-color: #eb6100;}
	.register .el-step__title.is-process,.register .el-step__title.is-finish{color: #EB6100;font-weight: normal;}
	.register .box{width: 600px;margin: 0 auto;padding: 30px 0;font-size: 16px;}
	.register .el-button{width: 350px;height: 50px;font-size: 16px;}
	.register .mybtn{margin: 0 auto;display: block;}
	.pic-uploader{border: 1px solid #dcdfe6;border-radius: 4px;height: 150px;position: relative;overflow: hidden;}
	.pic-uploader .pics{position: absolute;left: 0;top: 0;width: 100%;height: 100%;}
	.pic-uploader .up-text{position: absolute;left: 0;top: 0;width: 100%;height: 100%;}
	.pic-uploader .up-text i{font-size: 40px;margin-top: 35px;}
	.server-adds .el-input__inner{display: inline-block;}
	.register .box3{text-align: center;}
	.register .box3 i{font-size: 85px;color: #3fa137;margin: 50px 0 20px;}
	.register .box3 p{line-height: 2;color: #5e5e5f;font-size: 20px;}
</style>
<script>
	import router from '../router';
	import register1 from './small/Register-1'
	import register2 from './small/Register-2'
	
	export default{
		name:"register",
		data(){
			return{
				step:0,
				register_type:1,
 			}
 		},
 		created(){
 			
 		},
 		components: {
 			register1,
		  	register2,
	  	},
	 	mounted: function() {
		 		this.$nextTick(function() {
		 			this.init();
		 		}.bind(this))
		 	},
		 	methods: {
		 		init() {
					
		 		},
		
		 	}
	 	}
</script>