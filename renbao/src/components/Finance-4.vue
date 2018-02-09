<template>
	<div id="finance-4" style="background: #fff;padding-bottom: 30px;">
		<div class="tit">
			<span>充值明细</span>
		</div>
		<div class="boxs">
			<el-form :model='form' inline size='small'>
				<el-form-item label="充值时间">
				    <el-date-picker v-model="form.pay_time" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
			  	<el-form-item label="款项类别">
				   	<el-select v-model="form.pay_type" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in pay_type_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="账户名称">
				   	<el-select v-model="form.account_name" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in account_name_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="申请人">
				   	<el-select v-model="form.Operator" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in Operator_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="当前状态">
			  		<el-select v-model="form.order_state" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in order_state_options" :key="index" :value="item"></el-option>
				  	</el-select>
		  		</el-form-item>
			  	<el-button type="primary" size="small" @click="search">搜 索</el-button>
			</el-form>
			<div>
				<el-button type="primary" size="small" style="float: right;margin-bottom: 15px;" @click="dialogForm = true">导出数据</el-button>
			</div>
			<el-table :data="Data" border header-row-class-name="tableH" size="medium" style="text-align: center;">
		  		<el-table-column label="充值时间" >
		  			<template slot-scope="scope">
			    		{{scope.row.pay_time | getDate}}
			    	</template>
		  		</el-table-column>
			    <el-table-column label="充值金额">
			    	<template slot-scope="scope">
			    		{{scope.row.pay_money | getMoney}}
			    	</template>
			    </el-table-column>
			    <el-table-column property="pay_type" label="款项类别" width="120"></el-table-column>
			    <el-table-column property="account_name" label="账户名称"></el-table-column>
			    <el-table-column property="blank" label="开户银行"></el-table-column>
			    <el-table-column property="blank_num" label="银行账户"></el-table-column>
			    <el-table-column property="Operator" label="申请人" width="120"></el-table-column>
			    <el-table-column property="order_state" label="当前状态" width="120"></el-table-column>
			    <el-table-column label="操作" width="" type="index" width="120">
			    	<template slot-scope="scope">
			    		 <el-button type="primary" v-if="scope.row.order_state == '未支付'" size="small" @click="dialog1 = true">完成支付</el-button>
			    	</template>
			    </el-table-column>
		  	</el-table>
		  	<div style="text-align: right;margin: 10px;font-size: 20px;">
		  		当前余额合计：{{this.total | getMoney}}
		  	</div>
		</div>
		<el-dialog title="导出数据" :visible.sync="dialogForm" center>
		  	<el-form :model="form_out" style="text-align: center;">
		  	 	<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
			    	<el-checkbox v-for="item in checkOptions" :label="item" :key="item">{{item}}</el-checkbox>
			  	</el-checkbox-group>
			  	<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer" >
			    <el-button type="primary" @click="confirm()" size="small">确 定</el-button>
		  	</div>
		</el-dialog>
		<el-dialog title="上传支付凭证" :visible.sync="dialog1" custom-class="dialog1" width="">
		  	<div style="text-align: center;">
		  		<p style="font-size: 16px;margin-bottom: 10px;">请上传支付凭证</p>
		  		<!--<i class="el-icon-circle-plus" style="font-size: 70px;"></i>-->
				<el-upload action=""
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
		  	</div>
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
	.dialog1 .el-dialog__header{border-bottom: 1px solid #E1E1E1;}
</style>
<script>
	import '../filters';
	export default{
		name:"finance-4",
		data(){
			return{
				form:{
					pay_time:[],		//充值时间
					pay_type:'',		//款项类别
					account_name:'',	//账户名称
					Operator:'',		//申请人
					order_state:'',		//当前状态
				},
				total:0,
				pay_type_options:[],
				account_name_options:[],
				Operator_options:[],
				order_state_options:[],
				
				Data:[],
				dialogForm:false,
				checkList:[],
				checkOptions : ['充值时间','款项类别', '账户名称', '开户银行','银行账户','充值金额','当前状态','申请人'],
				checkAll:false,
				form_out:{},
				
				dialog1:false,
				dialogImageUrl: '',		//上传
        		dialogVisible: false
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
					{pay_time:"1517560677",pay_money:5210005,pay_type:'预存保费',account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456',Operator:'张三',order_state:'未支付'},
					{pay_time:"1517560677",pay_money:5210000,pay_type:'预存保费',account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456',Operator:'张三',order_state:'已支付'},
					{pay_time:"1517560677",pay_money:5210005,pay_type:'预存保费',account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456',Operator:'张三',order_state:'已支付'},
					{pay_time:"1517560677",pay_money:5210005,pay_type:'预存保费',account_name:'中国人保成都分公司',blank:'中国银行成都支行',blank_num:'4521534566546456',Operator:'张三',order_state:'已支付'},
				];
				if(this.Data){					
					this.getAll();
				}
			},
			//获得余额总数和下拉框内容
			getAll(){
				let t = 0;
				this.Data.forEach((v,i)=>{
					t += v.pay_money;
					this.pay_type_options.push(v.pay_type);
					this.account_name_options.push(v.account_name);
					this.Operator_options.push(v.Operator);
					this.order_state_options.push(v.order_state);
				})
				this.pay_type_options =[...new Set(this.pay_type_options)];
				this.account_name_options =[...new Set(this.account_name_options)];
				this.Operator_options =[...new Set(this.Operator_options)];
				this.order_state_options =[...new Set(this.order_state_options)];
				this.total = t;
			},
			//提交导出条件
			confirm(){
				this.dialogForm = false;
				console.log(this.checkList)
			},
			handleCheckAllChange(val) {
		        this.checkList = val ? this.checkOptions : [];
	      	},
	     	handleCheckedCitiesChange(value) {
		        var len = value.length;
		        this.checkAll = len === this.checkOptions.length;
		    },
		    //提交搜索
		    search(){
		    	console.log(this.form)
		    },
		    //上传
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
	      	},
	      	handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
	      	}
		}
	}
</script>
