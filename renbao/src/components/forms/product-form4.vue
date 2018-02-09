<template>
	<el-form :model="form" :rules="rule" ref="form" label-width="100px" class="form-4" label-position="left">
		<el-form-item label="投保方案:" prop="plan">
			<el-radio-group v-model="form.plan">
				<el-tooltip class="item" effect="dark" placement="top-start">
					<ul slot="content" class="mytool">
						<li><span>保费</span><span>1.5元/天/座</span></li>
						<li><span>保障项目</span><span>保障金额</span></li>
						<li><span>累计赔偿限额</span><span>50万*核定限载客数</span></li>
						<li><span>其中：乘客每座责任限额</span><span>50万元</span></li>
						<li><span>含：精神损害赔偿每座</span><span>8万元</span></li>
						<li><span>每人财产损失赔偿限额</span><span></span></li>
						<li><span>每次事故责任限额</span><span>无</span></li>
						<li><span>不计免赔率</span><span>0元</span></li>
						<li><span>每次事故免赔额</span><span>0元</span></li>
					</ul>
					<el-radio :label="1">普通版</el-radio>
			    </el-tooltip>
			    <el-tooltip class="item" effect="dark" placement="top-start">
			    	<ul slot="content" class="mytool">
						<li><span>保费</span><span>2.5元/天/座</span></li>
						<li><span>保障项目</span><span>保障金额</span></li>
						<li><span>累计赔偿限额</span><span>80万*核定限载客数</span></li>
						<li><span>其中：乘客每座责任限额</span><span>80万元</span></li>
						<li><span>含：精神损害赔偿每座</span><span>8万元</span></li>
						<li><span>每人财产损失赔偿限额</span><span></span></li>
						<li><span>每次事故责任限额</span><span>无</span></li>
						<li><span>不计免赔率</span><span>0元</span></li>
						<li><span>每次事故免赔额</span><span>0元</span></li>
					</ul>
			    	<el-radio :label="2">升级版</el-radio>
			    </el-tooltip>	
			</el-radio-group>
		</el-form-item>
	 	<div>
	      	<el-form-item prop="date1" label="保障起始日期:" label-width="110px" style="display: inline-block;">
	        	<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" size="medium" @blur="dataChange" value-format="timestamp"></el-date-picker>
	        	0时起
	      	</el-form-item>
	      	<el-form-item prop="date2" label="保障结束日期:" label-width="110px" style="display: inline-block; margin-right:10px; margin-left: 10px;margin-bottom: 0;">
	        	<el-date-picker type="date" placeholder="选择日期" v-model="form.date2" size="medium" @blur="dataChange" value-format="timestamp" ></el-date-picker>
	        	24时止
	      	</el-form-item>
	      	<span>共  {{form.times}} 天</span>
	      	<p class="statement" style="display: inline;">（日期将影响到保险期限和保费金额，请仔细核对。）</p>
	  	</div>
	  	<el-form-item label="出发地:" prop="add1" label-width="70px">
			<el-select v-model="form.add1.province" size="medium" name="add1_p" placehold="省份" @change="P_Select(1,form.add1.province)">
	      		<el-option v-for="(item , index) in form.add1.adds_p" :value="item.name" :key="index"></el-option>
	    	</el-select>
	    	<el-select v-model="form.add1.city" size="medium" name="add1_c" placehold="城市">
	      		<el-option v-for="(item , index) in form.add1.adds_c" :value="item.name" :key="index"></el-option>
	    	</el-select>
		</el-form-item>
		<el-form-item label="目的地:" prop="add2" label-width="70px">
			<el-select v-model="form.add2.province" size="medium" name="add2_p" placehold="省份" @change="P_Select(2,form.add2.province)">
	      		<el-option v-for="(item , index) in form.add2.adds_p" :value="item.name" :key="index"></el-option>
	    	</el-select>
	    	<el-select v-model="form.add2.city" size="medium" name="add2_c" placehold="城市">
	      		<el-option v-for="(item , index) in form.add2.adds_c" :value="item.name" :key="index"></el-option>
	    	</el-select>
		</el-form-item>
	</el-form>
</template>
<script>
	import {GETPROVINCECITY} from '../../constants';
	
	export default{
		name:"p-form4",
		data(){
			var Vadd1 = (rule, value, callback) => {
				if(!value.province){
					callback(new Error("请选择出发地省份"));
				}else if(!value.city){
					callback(new Error("请选择出发地城市"));
				}else{
					callback();
				}
			}
			var Vadd2 = (rule, value, callback) => {
				if(!value.province){
					callback(new Error("请选择出发地省份"));
				}else if(!value.city){
					callback(new Error("请选择出发地城市"));
				}else{
					callback();
				}
			}
			return{
				form:{
					plan:null,
					date1:null,
					date2:null,
					times:0,
					add1:{//出发地
						province:'',
						p_code:'',
						city:'',
						adds_p:[],			//可选的省
						adds_c:[],			//可选的市
					},
					add2:{//目的地
						province:'',
						p_code:'',
						city:'',
						adds_p:[],			//可选的省
						adds_c:[],			//可选的市
					},
					isVerify:0,
				},
				rule:{
					plan:[
						{ required: true, message: '请选择投保方案', trigger: 'change' }
					],
					date1:[
						{ required: true, message: '请选择保障起始日期', trigger: 'blur' }
					],
					date2:[
						{ required: true, message: '请选择保障结束日期', trigger: 'blur' }
					],
					add1:[
						{ required: true, validator: Vadd1, trigger: 'change' }
					],
					add2:[
						{ required: true, validator: Vadd2, trigger: 'change' }
					]
				},
			}
		},
		created(){
			this.getData();
		},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		methods:{
			init(){
				
			},
			getData(){
				//获取可选的省
				this.$http({
				  	method:'get',
				  	url: GETPROVINCECITY,
				  	params:{
				  		type:0,
				  	},
				}).then((res)=>{
					//console.log(res.data.data)
					this.form.add1.adds_p = res.data.data;
					this.form.add2.adds_p = res.data.data;
				}).catch((err)=>{
					console.log(err)
				});
			},
			//选取时间
			dataChange(){
				if(this.form.date1 && this.form.date2){					
					if(this.form.date1 > this.form.date2){
						this.form.date2 = this.form.date1;
						this.form.times = 1;
						this.$message.error('截止日期必须大于开始日期');
					}else{
						this.form.times = (this.form.date2 - this.form.date1)/1000/3600/24 + 1;						
					}
				}
				console.log(this.form.date1,this.form.date2)
			},
			//选取省份后
			P_Select(type,province){
				if(type == 1){
					this.form.add1.adds_p.forEach((v,i)=>{
						if(v.name == province){	
							this.form.add1.p_code = v.code;
							//获取可选的市
							this.$http({
							  	method:'get',
							  	url: GETPROVINCECITY,
							  	params:{
							  		type:1,
							  		provinceCode:v.code,
							  	},
							}).then((res)=>{
								this.form.add1.city = null;
								this.form.add1.adds_c = res.data.data;
							}).catch((err)=>{
								console.log(err)
							});
						}
					})
				}else if(type==2){
					this.form.add2.adds_p.forEach((v,i)=>{
						if(v.name == province){	
							this.form.add2.p_code = v.code;
							//获取可选的市
							this.$http({
							  	method:'get',
							  	url: GETPROVINCECITY,
							  	params:{
							  		type:1,
							  		provinceCode:v.code,
							  	},
							}).then((res)=>{
								this.form.add2.adds_c = res.data.data;
								this.form.add2.city = null;
							}).catch((err)=>{
								console.log(err)
							});
						}
					})
				}
				
			},
			//选取城市
			C_Select(){
				
			},
			submitForm(formName,type){
 				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		console.log('submit-4!');
		          		this.isVerify = 1;
		          	} else {
	           	 		this.isVerify = 0;
		          	}
 					if(type==2){
			          	this.$emit("childChang",this.isVerify,0);
 					}
		        });
      		},
		}
	}
</script>
<style type="text/css">
	
</style>