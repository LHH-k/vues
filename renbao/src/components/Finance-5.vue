<template>
	<div id="finance-5" style="background: #fff;padding-bottom: 30px;">
		<div class="tit">
			<span>支出明细</span>
		</div>
		<div class="boxs">
			<el-form :model='form' inline size='small'>
				<el-form-item label="支付时间">
				    <el-date-picker v-model="form.pay_time" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
			  	<el-form-item label="支付项目">
				   	<el-select v-model="form.pay_project" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in pay_project_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="付款对象">
				   	<el-select v-model="form.pay_to" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in pay_to_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="操作员">
				   	<el-select v-model="form.Operator" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in Operator_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="订单编号">
			  		<el-input v-model="form.order_id"></el-input>
		  		</el-form-item>
			  	<el-button type="primary" size="small" @click="search">搜 索</el-button>
			</el-form>
			<div>
				<el-button type="primary" size="small" style="float: right;margin-bottom: 15px;" @click="dialogForm = true">导出数据</el-button>
			</div>
			<el-table :data="Data" border header-row-class-name="tableH" size="medium" style="text-align: center;">
		  		<el-table-column label="支付时间" >
		  			<template slot-scope="scope">
			    		{{scope.row.pay_time | getDate}}
			    	</template>
		  		</el-table-column>
			    <el-table-column property="order_id" label="订单编号"></el-table-column>
			    <el-table-column property="pay_project" label="支出项目"></el-table-column>
			    <el-table-column label="支出金额">
			    	<template slot-scope="scope">
			    		{{scope.row.pay_money | getMoney}}
			    	</template>
			    </el-table-column>
			    <el-table-column property="pay_to" label="付款对象"></el-table-column>
			    <el-table-column property="Operator" label="操作员"></el-table-column>
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
	
</style>
<script>
	import '../filters';
	export default{
		name:"finance-5",
		data(){
			return{
				form:{
					pay_time:[],
					pay_project:'',
					pay_to:'',
					Operator:'',
					order_id:'',
				},
				Data:[],
				total:0,
				pay_project_options:[],
				pay_to_options:[],
				Operator_options:[],
				
				dialogForm:false,
				checkList:[],
				checkOptions : ['订单编号','支付时间', '支出项目', '支出金额','付款对象','操作人'],
				checkAll:false,
				form_out:{},
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
					{pay_time:"1517560677",order_id:'134567489',pay_project:'旅游用车承运人责任险',pay_money:75,pay_to:'中国人保成都分公司',Operator:'张三'},
					{pay_time:"1517560677",order_id:'134567489',pay_project:'旅游用车承运人责任险',pay_money:75,pay_to:'中国人保成都分公司',Operator:'张三'},
					{pay_time:"1517560677",order_id:'134567489',pay_project:'旅游用车承运人责任险',pay_money:75,pay_to:'中国人保成都分公司',Operator:'张三'},
					{pay_time:"1517560677",order_id:'134567489',pay_project:'旅游用车承运人责任险',pay_money:75,pay_to:'中国人保成都分公司',Operator:'张三'},
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
					this.pay_to_options.push(v.pay_project);
					this.pay_project_options.push(v.pay_to);
					this.Operator_options.push(v.Operator);
				})
				this.pay_to_options =[...new Set(this.pay_to_options)];
				this.pay_project_options =[...new Set(this.pay_project_options)];
				this.Operator_options =[...new Set(this.Operator_options)];
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
		}
	}
</script>
