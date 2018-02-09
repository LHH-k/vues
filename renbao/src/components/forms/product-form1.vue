<template>
	<div>
		<el-form :model="form" :rules="rule" ref="form" label-width="125px" class="form-1" label-position="left">
		  	<el-form-item label="驾驶员信息:" style="display: inline-block;" prop="jsyxx">
		    	<el-select v-model="form.jsyxx" size="medium" name="jsyxx">
		      		<el-option label="用户自驾" :value="1"></el-option>
		      		<el-option label="自有司机" :value="2"></el-option>
		    	</el-select>
		  	</el-form-item>
		  	<el-button v-show="form.jsyxx == 2" type="primary" size="medium" @click="changeDriver">选择驾驶员</el-button>
		  	<transition enter-active-class="animated fadeIn" leaver-active-class="animated fadeOut">
			  	<div v-show="form.jsyxx">
					<el-form-item label="驾驶员姓名:" prop="name" >
						<el-input v-model="form.name" size="medium"></el-input>
					</el-form-item>
					<el-form-item label="驾驶员身份证号:" prop="IDcard">
						<el-input v-model="form.IDcard" size="medium"></el-input>
					</el-form-item>
					<el-form-item label="性别:" prop="gender">
						<el-radio-group v-model="form.gender">
				      		<el-radio :label="1">男</el-radio>
				      		<el-radio :label="2">女</el-radio>
					    </el-radio-group>
					</el-form-item>
					<div v-show="form.jsyxx==2">
						<el-form-item label="所属公司:" prop="company">
							<el-input v-model="form.company" size="medium"></el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm('form',1)" size="medium">保存驾驶员信息</el-button>
					</div>
					<p class="statement">隐私保护声明 : 您提供的个人信息仅供本次报价及投保使用，我们不会泄露给任何第三方或作其他用途</p>
			  	</div>
		  	</transition>
		</el-form>
		<!--选择司机弹窗-->
		<el-dialog width="800px" :visible.sync="form.dialog" custom-class="popup_sj" :show-close="false" center>
		  	<el-table :data="form.Data" border header-row-class-name="tableH" size="medium" max-height="550">
		  		<el-table-column property="name" label="姓名" width="120px"></el-table-column>
			    <el-table-column property="id_card" label="身份证号码" width="180px"></el-table-column>
			    <el-table-column label="性别" width="100px">
			    	<template slot-scope="scope">
			    		<span v-if="scope.row.sex==2">女</span>
			    		<span v-else-if="scope.row.sex==1">男</span>
			    	</template>
			    </el-table-column>
			    <el-table-column property="belong_company" label="所属公司" width="280px"></el-table-column>
			    <el-table-column label="选择" width="119px">
			    	<template slot-scope="scope">
			    		 <el-button size="small" :class="{'cur':form.nowCur == scope.$index}" @click="PopupSelect(scope.row,scope.$index)">选 择</el-button>
			    	</template>
			    </el-table-column>
		  	</el-table>
		  	<span slot="footer" class="dialog-footer">
			    <el-button size="medium" @click="close">取 消</el-button>
			    <el-button size="medium" type="primary" @click="confirm()">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>
<script>
	import {GETDRIVERINFO} from '../../constants';
	import {ADDDRIVER} from '../../constants';
	import {UPDATEDRIVER} from '../../constants';
	
	export default{
		name:"p-form1",
		data(){
	      	var Vname = (rule, value, callback) => {
	      		if(this.form.jsyxx){
	      			let regName = /^[\u4e00-\u9fa5]{2,}$/;
			        if (!value) {
		          		callback(new Error('请填写驾驶员姓名'));
		        	}else if(!regName.test(value)){
		        		callback(new Error('请填写正确的中文姓名'));
		        	}else{
		        		callback()
		        	}
	      		}else{
	        		callback()
	        	}
	      	};
	      	var VID = (rule, value, callback) => {
	      		var IDreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
		        if(this.form.jsyxx){
			        if(!value) {
		          		callback(new Error('请填写驾驶员身份证号码'));
		        	}else if(!IDreg.test(value)){
		        		callback(new Error('请填写正确的身份证号码'));
		        	}else{
		        		callback()
		        	}
		        }else{
	        		callback();
	        	}
	      	};
	      	var Vgender = (rule, value, callback) => {
	      		if(this.form.jsyxx){
			        if (!value) {
		          		callback(new Error('请选择驾驶员性别'));
		        	}else{
		        		callback()
		        	}
	      		}else{
	        		callback()
	        	}
	      	};
	      	var Vcompany = (rule, value, callback) => {
	      		if(this.form.jsyxx==2){
			        if (!value) {
		          		callback(new Error('请选择驾驶员所在公司,若无,请填写个人'));
		        	}else{
		        		callback()
		        	}
			    }else{
	        		callback()
	        	}
	      	};
			return{
				//司机信息
				form:{
					jsyxx:'',
					name:'',
					IDcard:'',
					gender:'',
					company:'',
					id:null,
					
					isVerify:0,
					dialog: false,
					nowCur:null,
					formInfo:{},
					Data:[],
				},
				//司机规则
				rule:{
					jsyxx:[
						{ required: true, message: '请选择驾驶员信息', trigger: 'change' }
					],
		         	name:[
		         		{ required: true,validator:Vname , trigger: 'blur' },
		         	],
		         	IDcard:[
		         		{required: true, validator:VID , trigger: 'blur' },
		         	],
		         	gender: [
			            {required: true, validator:Vgender , trigger: 'change' }
		          	],
		          	company:[
		          	 	{required: true, validator:Vcompany , trigger: 'blur' }
		          	]
				},
			}
		},
		watch:{
			
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
			getData(){
				//司机信息
				this.$http({
				  	method:'get',
				  	url: GETDRIVERINFO + '1000',
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
			//选择司机弹窗
			changeDriver(){
				this.getData();
				this.form.dialog=true
			},
			//弹窗内选择
			PopupSelect(row,index){
				//选择司机
				this.form.nowCur = index;
				this.form.formInfo = row;
			},
			//弹窗关闭
			close(){
				this.form.dialog = false;
				this.form.formInfo = {};
				this.form.nowCur = null;
				this.InfoChange();
				this.submitForm('form',0);
			},
			//弹窗确定
			confirm(){
				this.InfoChange();
				this.form.dialog = false;
				this.submitForm('form',0);
			},
			//表单内容修改
			InfoChange(){
				this.form.name = this.form.formInfo.name;
				this.form.IDcard = this.form.formInfo.id_card;
				this.form.gender = this.form.formInfo.sex;
				this.form.company = this.form.formInfo.belong_company;
				this.form.id = this.form.formInfo.id;
			},
			//驾驶员信息提交
 			submitForm(formName,type){//type：0 只验证  ：1内部提交验证  ：2 外部提交
		        this.$refs[formName].validate((valid) => {
		        	if(type){
			          	if (valid) {
			          		console.log('submit-1!');
			          		this.isVerify = 1;
			          		//更新
			          		if(this.form.id){	
			          			this.$http({
								  	method:'put',
								  	url: UPDATEDRIVER + this.form.id,
								  	data:{
								  		name : this.form.name,
								  		id_card : this.form.IDcard,
								  		sex : this.form.gender,
								  		belong_company : this.form.company,
								  	},
								}).then((res) => {
									console.log(res.data.res);
									if(type==1 && res.data.res){
										this.$message.success('司机信息修改成功！');
									}
								}).catch((err)=>{
									console.log(err)
				          		})
			          		}else if(this.form.jsyxx==2){	//添加
			          			this.$http({
								  	method:'post',
								  	url: ADDDRIVER,
								  	data:{
								  		name : this.form.name,
								  		id_card : this.form.IDcard,
								  		sex : this.form.gender,
								  		belong_company : this.form.company,
								  	},
								}).then((res)=>{
									console.log(res.data.res)
									if(type==1 && res.data.res){
										this.$message.success('司机信息添加成功！');
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