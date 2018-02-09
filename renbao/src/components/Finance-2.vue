<template>
	<div id="finance-2" style="background: #fff;padding-bottom: 30px;">
		<div class="tit">
			<span>预存款余额明细</span>
		</div>
		<div class="boxs">
			<el-form :model='form' inline size='small'>
			 	<el-form-item label="对方名称">
				   	<el-select v-model="form.name" placeholder="请选择">
				   		<el-option value="选择全部"></el-option>
					    <el-option v-for="(item,index) in name_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="机构名称">
				   	<el-select v-model="form.company_name" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in company_name_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="产品类型">
				   	<el-select v-model="form.product_type" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in product_type_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-form-item label="产品名称">
				   	<el-select v-model="form.product_name" placeholder="请选择">
				   		<el-option label="选择全部" value="0"></el-option>
					    <el-option v-for="(item,index) in product_name_options" :key="index" :value="item"></el-option>
				  	</el-select>
			  	</el-form-item>
			  	<el-button type="primary" size="small" @click="search">搜 索</el-button>
			</el-form>
			<div>
				<el-button type="primary" size="small" style="float: right;margin-bottom: 15px;" @click="dialogForm = true">导出数据</el-button>
			</div>
			<el-table :data="Data" border header-row-class-name="tableH" size="medium" style="text-align: center;">
		  		<el-table-column property="name" label="对方名称" ></el-table-column>
			    <el-table-column property="company_name" label="机构名称"></el-table-column>
			    <el-table-column property="product_type" label="产品类型"></el-table-column>
			    <el-table-column property="product_name" label="产品名称"></el-table-column>
			    <el-table-column label="当前余额">
			    	<template slot-scope="scope">
			    		{{scope.row.balance | getMoney}}
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作" width="" type="index" width="160px">
			    	<template slot-scope="scope">
			    		 <el-button size="small" type="primary" @click="PopupSelect(scope.row,scope.$index)">查看充值记录</el-button>
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
		name:"finance-2",
		data(){
			return{
				form:{
					name:'',
					company_name:'',
					product_type:'',
					product_name:'',
				},
				Data:[],
				total:0,
				name_options:[],
				company_name_options:[],
				product_type_options:[],
				product_name_options:[],
				
				dialogForm:false,
				checkList:[],
				checkOptions : ['对方名称', '机构名称', '产品类型', '产品名称','当前余额'],
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
				setTimeout(()=>{
					this.Data = [
						{name:"中国人保",company_name:'成都人保分公司',product_type:'责任险',product_name:"旅游用车承运人责任险",balance:4500000},
						{name:"张三",company_name:'成都人保分公司',product_type:'意外险',product_name:"旅游意外险",balance:14500001.21},
						{name:"中国平安",company_name:'成都人保分公司',product_type:'责任险',product_name:"旅游用车承运人责任险",balance:4500000},
						{name:"张三",company_name:'成都人保分公司',product_type:'责任险',product_name:"旅游用车承运人责任险",balance:4500000},
						{name:"张三",company_name:'成都人保分公司',product_type:'责任险',product_name:"旅游意外险",balance:4500000},
						{name:"张三",company_name:'成都人保分公司',product_type:'责任险',product_name:"旅游用车承运人责任险",balance:4500000},
					];	
					if(this.Data){					
						this.getAll();
					}
				},500)
				
			},
			//获得余额总数和下拉框内容
			getAll(){
				let t = 0;
				this.Data.forEach((v,i)=>{
					t += v.balance;
					this.name_options.push(v.name);
					this.company_name_options.push(v.company_name);
					this.product_type_options.push(v.product_type);
					this.product_name_options.push(v.product_name);
				})
				this.name_options =[...new Set(this.name_options)];
				this.company_name_options =[...new Set(this.company_name_options)];
				this.product_type_options =[...new Set(this.product_type_options)];
				this.product_name_options =[...new Set(this.product_name_options)];
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
		    }
		}
	}
</script>
