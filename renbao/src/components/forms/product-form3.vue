<template>
	<el-form :model="form" :rules="rule" ref="form" label-width="100px" class="form-3" label-position="left">
		<div style="margin-bottom: 15px;">
			<el-button type="primary" @click="changeCar" size="medium">选择在库车辆</el-button>
			<el-button type="primary" @click="" size="medium">选择行驶证照片并识别</el-button>
		</div>
		<div style="overflow: hidden;">
			<el-form-item label="车牌号码:" prop="plateNum" style="width: 38%;float: left; margin-right: 3%;" label-width="110px">
				<el-input v-model="form.plateNum" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="车辆类型:" prop="style" style="width:28%;float: left; margin-right: 3%;">
				<el-input v-model="form.style" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="所有人:" prop="owner" style="width:28%;float: left;">
				<el-input v-model="form.owner" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="所有人住址:" prop="adds" style="width: 38%;float: left; margin-right: 3%;" label-width="110px">
				<el-input v-model="form.adds" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="使用性质:" prop="useCharacter" style="width:28%;float: left; margin-right: 3%;">
				<el-input v-model="form.useCharacter" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="品牌型号:" prop="model" style="width:28%;float: left;">
				<el-input v-model="form.model" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="车辆识别代码:" prop="VIN" style="width: 38%;float: left; margin-right: 3%;" label-width="110px">
				<el-input v-model="form.VIN" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="发动机号码:" prop="engineNo" style="width:28%;float: left; margin-right: 3%;">
				<el-input v-model="form.engineNo" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="核载人数:" prop="NIN" style="width:28%;float: left;">
				<el-input v-model="form.NIN" size="medium"></el-input>
			</el-form-item>
		</div>
		<!--弹窗列表-->
		<el-dialog width="800px" :visible.sync="form.dialog" custom-class="popup_car" :show-close="false" center>
		  	<el-table :data="form.Data" border header-row-class-name="tableH" size="medium" max-height="550">
		  		<el-table-column property="car_plate" label="车牌号码" width="150px"></el-table-column>
			    <el-table-column property="car_type" label="车辆类型" width="140px"></el-table-column>
			    <el-table-column property="car_seat" label="核载人数" width="100px"></el-table-column>
			    <el-table-column property="car_character" label="使用性质" width="150px"></el-table-column>
			    <el-table-column property="car_owner" label="所有人" width="150px"></el-table-column>
			    <el-table-column label="选择" width="" type="index" width="109px">
			    	<template slot-scope="scope">
			    		 <el-button size="small" :class="{'cur':form.nowCur == scope.$index}" @click="PopupSelect(scope.row,scope.$index)">选 择</el-button>
			    	</template>
			    </el-table-column>
		  	</el-table>
		  	<span slot="footer" class="dialog-footer">
			    <el-button size="medium" @click="close()">取 消</el-button>
			    <el-button size="medium" type="primary" @click="confirm()">确 定</el-button>
		  	</span>
		</el-dialog>
		<el-button type="primary" @click="submitForm('form',1)" size="medium">保存车辆信息</el-button>
	</el-form>
</template>
<script>
	import {GETCARINFO} from '../../constants';
	import {ADDCAR} from '../../constants';
	import {UPDATECAR} from '../../constants';
	
	export default{
		name:"p-form3",
		data(){
			return{
				form:{
					plateNum:'',
					style:'',
					owner:'',
					adds:'',
					useCharacter:'',
					model:'',
					VIN:'',
					engineNo:'',
					NIN:'',
					id:null,
					
					isVerify:0,
					dialog: false,
					nowCur:null,
					formInfo:{},
					Data:[],
				},
				rule:{
					plateNum: [
			            { required: true, message: '请填写车牌号码', trigger: 'blur' }
		         	],
		         	style:[
		         		{ required: true, message: '请填写车辆类型', trigger: 'blur' }
		         	],
		         	owner:[
		         		{ required: true, message: '请填写车辆所有人', trigger: 'blur' }
		         	],
		         	adds: [
			           	{ required: true, message: '请填写所有人地址', trigger: 'blur' }
		          	],
		          	useCharacter: [
			           	{ required: true, message: '请选择车辆使用性质', trigger: 'blur' }
		          	],
		          	model: [
			           	{ required: true, message: '请填写车辆品牌型号', trigger: 'blur' }
		          	],
		          	VIN: [
			           	{ required: true, message: '请填写车辆识别代码', trigger: 'blur' }
		          	],
		          	engineNo: [
			           	{ required: true, message: '请填写车辆发动机号码', trigger: 'blur' }
		          	],
		          	NIN: [
			           	{ required: true, message: '请选择车辆核载人数', trigger: 'blur' }
		          	],
				},
				isInfoChange:false,
			}
		},
		created(){
			//this.getData();
		},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		methods:{
			init(){
				
			},
			//获取数据
			getData(){
				//车辆信息
				this.$http({
				  	method:'get',
				  	url: GETCARINFO + '1000',
				  	params:{
				  		page:1
				  	},
				}).then((res)=>{
					this.form.Data = res.data.data.data;
					//console.log(this.form.Data)
				}).catch((err)=>{
					console.log(err)
				});
			},
			//改变页面表单信息
			InfoChange(){
				this.form.plateNum = this.form.formInfo.car_plate;
				this.form.style = this.form.formInfo.car_type;
				this.form.owner = this.form.formInfo.car_owner;
				this.form.adds = this.form.formInfo.car_address;
				this.form.useCharacter = this.form.formInfo.car_character;
				this.form.model = this.form.formInfo.car_model;
				this.form.VIN = this.form.formInfo.car_vin;
				this.form.engineNo = this.form.formInfo.car_engine;
				this.form.NIN = this.form.formInfo.car_seat;
				this.form.id = this.form.formInfo.id;
			},
			//选择车辆
			changeCar(){
				this.form.dialog=true
				this.getData();
			},
			//弹窗选择
			PopupSelect(row,index){
				this.form.nowCur = index;
				this.form.formInfo = row;
			},
			//关闭弹窗
			close(){
				this.form.dialog = false;
				this.form.formInfo = {};
				this.form.nowCur = null;
				this.InfoChange();
				this.submitForm('form',0);
			},
			//确认弹窗
			confirm(){
				this.InfoChange();
				this.form.dialog = false;
				this.submitForm('form',0);
			},
			//车辆信息验证并提交表单
 			submitForm(formName,type){//type：0 只验证  ：1内部提交验证  ：2 外部提交
		        this.$refs[formName].validate((valid) => {
		        	if(type){
			          	if (valid) {
			          		console.log('submit-3!');
			          		this.isVerify = 1;
			          		//更新
			          		if(this.form.id){	
			          			this.$http({
								  	method:'put',
								  	url: UPDATECAR + this.form.id,
								  	data:{
								  		car_plate : this.form.plateNum,
										car_type  : this.form.style,
										car_owner : this.form.owner,
										car_address : this.form.adds ,
										car_character : this.form.useCharacter,
										car_model : this.form.model,
										car_vin	  : this.form.VIN,
										car_engine: this.form.engineNo,
										car_seat  : this.form.NIN,
								  	},
								}).then((res) => {
									console.log(res.data.res);
									if(type==1 && res.data.res){
										this.$message.success('车辆信息修改成功！');
									}
								}).catch((err)=>{
									console.log(err)
				          		})
			          		}else{	//添加
			          			this.$http({
								  	method:'post',
								  	url: ADDCAR,
								  	data:{
								  		car_plate : this.form.plateNum,
										car_type  : this.form.style,
										car_owner : this.form.owner,
										car_address : this.form.adds ,
										car_character : this.form.useCharacter,
										car_model : this.form.model,
										car_vin	  : this.form.VIN,
										car_engine: this.form.engineNo,
										car_seat  : this.form.NIN,
								  	},
								}).then((res)=>{
									console.log(res.data.res)
									if(type==1 && res.data.res){
										this.$message.success('车辆信息添加成功！');
									}
								}).catch((err)=>{
									console.log(err)
				          		})
			          		}
			          	} else {
		           	 		this.isVerify = 0;
			          	}
			        	if(type == 2){
				          	this.$emit("childChang",this.isVerify,0);
	 					}
		        	}
		        });
      		},
		}
	}
</script>
<style type="text/css">
	h4{font-size: 50px;margin: 100px auto 0;line-height: 100px;}
</style>