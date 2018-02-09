<template>
	<div id="finance-3" style="background: #fff;padding-bottom: 30px;">
		<div class="tit">
			<span>充值申请</span>
		</div>
		<div class="boxs" style="width:800px;">
			<el-form :model='form' :rules="rule" label-width="110px" size='medium' ref="form" >
				<el-form-item label="支付申请时间:" prop="time">
				 	<el-date-picker v-model="form.time" type="date" placeholder="选择日期" size="medium"></el-date-picker>
  				</el-form-item>
	    		<el-form-item label="申请人:" prop="user" >
					<el-input v-model="form.user" size="medium" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item label="申请金额:" prop="money" >
					<el-input v-model="form.money" size="medium" type="number" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item label="资金类型:" prop="style" >
					<el-select v-model="form.style" size="medium" name="style">
			      		<el-option v-for="(item,i) in styles" :key='i' :value="item"></el-option>
			    	</el-select>
				</el-form-item>
				<el-form-item label="对方名称:" prop="account_name" >
					<el-input v-model="form.account_name" size="medium" style="width: 280px;"></el-input>
					<el-button type="primary" size="medium" @click="dialog = true">选择</el-button>
				</el-form-item>
				<el-form-item label="开户银行:" prop="blank" >
					<el-input v-model="form.blank" size="medium" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item label="银行账号:" prop="blank_num" >
					<el-input v-model="form.blank_num" size="medium" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item>
			  		<el-button type="primary" size="medium" @click="submitForm('form',0)">确认提交</el-button>
			  	</el-form-item>
			</el-form>
		</div>
		
		<el-dialog width="800px" :visible.sync="dialog" :show-close="false" center custom-class="myDialog">
		  	<el-table :data="Data" border header-row-class-name="tableH" size="medium" max-height="550">
		  		<el-table-column property="account_name" label="账户名称"></el-table-column>
			    <el-table-column property="blank" label="身份证号码" width=""></el-table-column>
			    <el-table-column property="blank_num" label="性别" width=""></el-table-column>
			    <el-table-column label="选择" width="" type="index">
			    	<template slot-scope="scope">
			    		 <el-button size="small" :class="{'cur':nowCur == scope.$index}" @click="PopupSelect(scope.row,scope.$index)">选 择</el-button>
			    	</template>
			    </el-table-column>
		  	</el-table>
		  	<span slot="footer" class="dialog-footer">
			    <el-button size="medium" @click="close">取 消</el-button>
			    <el-button size="medium" type="primary" @click="confirm()">确 定</el-button>
		  	</span>
		</el-dialog>
		
		<el-dialog title="充值申请信息核对" :visible.sync="dialogForm" custom-class="myDialog1" width="500px">
			<ul>
				<li>申请人：{{form.user}}</li>
				<li>申请金额：{{form.money | getMoney}}</li>
				<li>资金用途：{{form.style}}</li>
			</ul>
			<ul>
				<li>账户名称：{{form.account_name}}</li>
				<li>开户银行：{{form.blank}}</li>
				<li>银行账号：{{form.blank_num}}</li>
			</ul>
			<ul>
				<li>申请支付时间：{{form.time | getDateByD}}</li>
				<li>申请提交时间：{{form.time1 | getDateByD}}</li>
			</ul>
			<span slot="footer" class="dialog-footer" style="text-align: center;">
			    <el-button size="medium" type="primary" @click="confirmAll()" >确认提交</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>
<style type="text/css">
	.el-form-item{margin-bottom: 18px;}
	.tit{padding:15px 20px;font-size: 20px;line-height: 36px;border-bottom: 2px solid #e1e1e1;}
	.boxs{padding:24px;}
	.box{padding: 15px 0 10px;}
	.box-c{overflow: hidden;padding-top: 24px;}
	.statement{color: #e80000;font-size: 12px;margin-top: 20px;}
	.tableH th{text-align: center;background:#409EFF; color: #fff;}
	.cur{color: #fff !important;background-color: #409EFF !important;border-color: #409EFF !important;}
	.myDialog .el-dialog__header{display: none;}
	.myDialog.el-dialog--center .el-dialog__body{padding: 0;text-align: center;}
	.myDialog1 .el-dialog__header{border-bottom: 1px solid #e1e1e1;}
	input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{ -webkit-appearance: none !important;}
</style>
<script>
	import '../filters';
	export default{
		name:"finance-3",
		data(){
			return{
				form:{
					time:null,			//支付申请时间
					time1:null,			//填表时间
					user:'',			//申请人
					money:null,			//申请金额
					style:'',			//资金类型
					account_name:'',	//对方名称
					blank:'',			//开户银行
					blank_num:'',		//银行账号
					
					formInfo:{}			//临时选择的数据存放
				},
				rule:{
					time:[
						{ required: true, message: '请选择申请支付时间', trigger: 'change blur' }
					],
		         	user:[
		         		{ required: true, message: '请填写申请人姓名', trigger: 'blur' },
		         	],
		         	money:[
		         		{ required: true, message: '请填写申请金额', trigger: 'blur' },
		         	],
		         	style:[
		         		{ required: true, message: '请选择资金类型', trigger: 'change'},
		         	],
		         	account_name:[
		         		{ required: true, message: '请填写对方名称', trigger: 'blur' },
		         	],
		         	blank:[
		         		{ required: true, message: '请填写开户银行', trigger: 'blur' },
		         	],
		         	blank_num:[
		         		{ required: true, message: '请填写银行账号', trigger: 'blur' },
		         	]
				},
				Data:[],				//页面开始获取的table数据
				nowCur:null,			//弹框里面的选择按钮是否选择
				styles:['预存保费'],		//类型选择
				isInfoChange:false,		//是否更改选择
				dialog:false,			//选择弹窗
				dialogForm:false,		//信息确认弹窗
			}
		},
		components:{
			
		},
		created(){
			this.getData();
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
			getData(){
				this.Data = [
					{account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456'},
					{account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456'},
					{account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456'},
					{account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456'},
				]
			},
			//表单内容更改
			InfoChange(){						
				this.form.account_name = this.form.formInfo.account_name;
				this.form.blank = this.form.formInfo.blank;
				this.form.blank_num = this.form.formInfo.blank_num;
				this.isInfoChange = true;
			},
			//弹窗关闭
			close(){							
				this.dialog = false;
				if(!this.isInfoChange){
					this.nowCur = null;
				}
			},		
			//弹窗确认
			confirm(){
				this.InfoChange();
				this.dialog = false;
				this.submitForm('form',1);
			},
			//弹窗选择
			PopupSelect(row,index){
				this.nowCur = index;
				this.form.formInfo = row;
			},
			//提交表单验证
			submitForm(formName,type){	//type：0 验证并提交  ：1只验证  
		        this.$refs[formName].validate((valid) => {
		        	if(!type){
			          	if (valid) {
			          		this.dialogForm = true;
			          		this.form.time1 = new Date();
			          	} else {
			          		
			          	}
		        	}
		        });
      		},
			//点击提交
			confirmAll(){
				this.dialogForm = false;
				console.log(this.form)
			},
		}
	}
</script>
