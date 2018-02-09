<template>
	<div id="product-1-1">
		<div class="tit">
			<span>旅游用车承运人险</span>
			<!--<el-button type="primary" size="medium" style="float: right;">批量导入投保信息</el-button>-->
		</div>
		<div class="boxs">
			<div class="box box1">
				<div class="stit">
					工作人员信息
				</div>
				<div class="box-c">
					<!--司机选择-->
					<div style="width: 46%;float: left;">
						<p-form1 @childChang='xxChange' ref="form1">
						</p-form1>
					</div>
					<!--导游选择-->
					<div style="width: 46%;float: right;">
						<p-form2 @childChang='xxChange' ref="form2">
						</p-form2>
					</div>
				</div>
			</div>
			<!--选择投保车辆-->
			<div class="box box2">
				<div class="stit">
					投保车辆信息
				</div>
				<div class="box-c">
					<p-form3 ref="form3" @childChang='xxChange'></p-form3>
				</div>
			</div>
			<!--选择投保计划-->
			<div class="box box3">
				<div class="stit">
					投保计划
				</div>
				<div class="box-c">
					<p-form4  ref="form4" @childChang='xxChange'></p-form4>
				</div>
			</div>
		</div>
		<div class="submit-box" style="margin: 20px auto;text-align: center;">
			<el-button type="success" @click="viewC" v-if="isHaveOrder">查看已有保单</el-button>
			<el-button type="primary" @click="submitForm" >提交信息</el-button>
		</div>
	</div>
</template>
<style type="text/css">
	
</style>
<script>
	import {GETORDERINFO} from '../constants';
	import {GETORDER} from '../constants';
	import {ADDORDER} from '../constants';
	import {UPDATEORDER} from '../constants';
	
	import PForm1 from './forms/product-form1';
	import PForm2 from './forms/product-form2';
	import PForm3 from './forms/product-form3';
	import PForm4 from './forms/product-form4';
	export default{
		name:"product-1-1",
		props:['modifyId'],			//是否是修改
		data(){
			return{
				canSubmit:0,		//能提交的表单数
				isHaveOrder:true,	//是否有订单
			}
		},
		created(){
			this.getData();
		},
		components: {
		  	PForm1,
		  	PForm2,
		  	PForm3,
		  	PForm4,
	  	},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		filters:{
			
		},
		methods:{
			init(){
				
			},
			//获取数据
			getData(){
				//console.log('是否是修改订单:' + (this.modifyId ? '是' : '不是'))
				if(this.modifyId){
					//获取修改的信息
					this.$http({
					  	method:'get',
					  	url: GETORDER + this.modifyId,
					  	params:{},
					}).then((res)=>{
						//console.log('修改信息：',res.data.data)
						this.modify(res.data.data);
					}).catch((err)=>{
						console.log(err)
					});
				}else{
					//订单信息 （只为了判断是否有没结算的单子）
					this.$http({
					  	method:'get',
					  	url: GETORDERINFO + '1000',
					  	params:{
					  		page:1
					  	},
					}).then((res)=>{
						this.isHaveOrder = res.data.res;
					}).catch((err)=>{
						console.log(err)
					});
				}
				//console.log('是否有未完成的订单：' + this.isHaveOrder);
			},
			//修改a
			modify(datas){
   				this.$refs['form1'].form.jsyxx 	 = datas.has_driver;
   				this.$refs['form1'].form.name 	 = datas.driver_name;
   				this.$refs['form1'].form.IDcard  = datas.driver_id_card;
   				this.$refs['form1'].form.gender  = datas.driver_sex;
   				this.$refs['form1'].form.company = datas.driver_belong_company;
   				this.$refs['form2'].form.dyxx 	 = datas.has_guide;
   				this.$refs['form2'].form.name 	 = datas.guide_name;
   				this.$refs['form2'].form.IDcard  = datas.guide_id_card;
   				this.$refs['form2'].form.gender  = datas.guide_sex;
   				this.$refs['form3'].form.plateNum   = datas.car_plate;
   				this.$refs['form3'].form.style   = datas.car_type;
   				this.$refs['form3'].form.owner   = datas.car_owner;
   				this.$refs['form3'].form.adds    = datas.car_address;
   				this.$refs['form3'].form.useCharacter  = datas.car_character;
   				this.$refs['form3'].form.model   = datas.car_model;
   				this.$refs['form3'].form.VIN     = datas.car_vin;
   				this.$refs['form3'].form.engineNo= datas.car_engine;
   				this.$refs['form3'].form.NIN     = datas.car_seat;
				this.$refs['form4'].form.plan    = datas.type;
				this.$refs['form4'].form.date1   = datas.start_time*1000;
				this.$refs['form4'].form.date2   = datas.end_time*1000;
				this.$refs['form4'].form.add1.province	= datas.start_province;
				this.$refs['form4'].form.add1.city   	= datas.start_city;
				this.$refs['form4'].form.add2.province 	= datas.end_province;
				this.$refs['form4'].form.add2.city     	= datas.end_city;
			},
			//接受子组件消息
			xxChange(msg,type){
				//表单验证消息返回
				if(type == 0){
					this.canSubmit += msg;
				}
			},
			viewC(){
				this.$emit("ViewChang",'P2');
			},
			//信息提交
 			submitForm(){
   				var allform = this.$refs;
   				var forms = [];
   				for( let key in allform ){
   					allform[key].submitForm('form',2);
   					forms.push(allform[key].form);
   				}
   				//console.log(forms);
   				//4个表单都验证并提交了
   				if(this.canSubmit == 4){
   					//提交的数据
   					var post_datas = {
   						insurance_name	: 0,
				  		has_driver 		: forms[0].jsyxx,
				  		driver_name 	: forms[0].name,
				  		driver_id_card 	: forms[0].IDcard,
				  		driver_sex		: forms[0].gender,
				  		driver_belong_company : forms[0].company,
				  		has_guide		: forms[1].dyxx,
				  		guide_name		: forms[1].name,
				  		guide_id_card	: forms[1].IDcard,
				  		guide_sex		: forms[1].gender,
				  		car_plate		: forms[2].plateNum,
				  		car_type		: forms[2].style,
				  		car_owner		: forms[2].owner,
				  		car_address		: forms[2].adds,
				  		car_character	: forms[2].useCharacter,
				  		car_model		: forms[2].model,
				  		car_vin			: forms[2].VIN,
				  		car_engine		: forms[2].engineNo,
				  		car_seat		: forms[2].NIN,
				  		type			: forms[3].plan,
				  		start_time		: forms[3].date1/1000,
				  		end_time		: forms[3].date2/1000+(3600*24-1),
						start_province  : forms[3].add1.province,
						start_city  	: forms[3].add1.city,
						end_province  	: forms[3].add2.province,
						end_city  		: forms[3].add2.city
   					}
   					if(this.modifyId){
   						//提交当前订单信息
						this.$http({
						  	method:'put',
						  	url	: UPDATEORDER + this.modifyId,
						  	data: post_datas,
						}).then((res)=>{
							//console.log(res.data.res)
							if(res.data.res){
								this.$message.success('保单提交成功！');
		   						this.viewC();
							}else{
								this.$message.error('保单提交失败！');
							}
						}).catch((err)=>{
							console.log(err)
						});
   					}else{
		   				//提交当前订单信息
						this.$http({
						  	method : 'post',
						  	url : ADDORDER,
						  	data : post_datas ,
						}).then((res)=>{
							//console.log(res.data.res)
							if(res.data.res){
								this.$message.success('保单提交成功！');
		   						this.viewC();
							}else{
								this.$message.error('保单提交失败！');
							}
						}).catch((err)=>{
							console.log(err)
						});
   					}
   				}else{
   					this.$message.error('保单提交失败！');
   					this.canSubmit = 0;
   				}
      		},
		}
	}
</script>
