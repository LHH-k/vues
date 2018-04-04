<template>
	<div id="product-1-2">
		<div class="tit">
			<span>投保明细</span>
		</div>
		<div class="boxs">
			<div class="box box1">
				<el-table :data="tableData" style="width: 100%;text-align: center;" header-row-class-name="tableH"  border size="medium">
					<el-table-column property="car_plate" label="车牌号码" width=""></el-table-column>
					<el-table-column label="险种名称" width="180px">
						<template slot-scope="scope">
							<span v-if=" scope.row.insurance_name == 0 "> 旅游用车承运人险 </span>
				      	</template>
					</el-table-column>
					<el-table-column label="投保方案" width="">
						<template slot-scope="scope">
							<span v-if=" scope.row.type == 1 "> 普通版 </span>
							<span v-else-if=" scope.row.type == 2 "> 升级版 </span>
				      	</template>
					</el-table-column>
					<el-table-column label="保障期限" width="">
						<template slot-scope="scope">
							{{ dates[scope.$index] | getDate1}}
				      	</template>
					</el-table-column>
					<el-table-column label='保障起始日期' width="180px">
						<template slot-scope="scope">
							{{ scope.row.start_time | getDate}}-{{ scope.row.end_time | getDate}}
				      	</template>
					</el-table-column>
					<el-table-column property="car_seat" label="被保险座位数" width=""></el-table-column>
					<el-table-column label="操作" width="">
				    	<template slot-scope="scope">
				    		 <el-button size="mini" type="primary" @click="viewC(scope.row.id)">修改</el-button>
				    		 <!--<el-button size="mini" type="danger" @click="delete(scope.row.id)">删除</el-button>-->
				    	</template>
				    </el-table-column>
					<el-table-column label="保费小计" width="">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? 1.5*scope.row.car_seat*dates[scope.$index] : 2.5*scope.row.car_seat*dates[scope.$index] | getMoney}}
				      	</template>
					</el-table-column>
				</el-table>
				<div class="total">
					合计：{{sum | getMoney}}
				</div>
				<a class="statement" style="display: block;">查看投保声明，以上未尽事宜以您收到的保单及条款为准。</a>
			</div>
		</div>
		<div style="text-align: center;margin: 20px auto;">
			<el-button type="success" @click="viewC(0)" style="margin-right: 10px">添加保单</el-button>
		    <el-button type="primary" style="">确认投保</el-button>
		</div>
	</div>
</template>
<style type="text/css">
	.total{width: 100%;border:1px solid #ebeef5;border-top-width: 0;line-height: 50px;font-size: 16px;text-align: right;padding-right: 30px;} 
</style>
<script>
	import {GETORDERINFO} from '../constants';
	import '../filters';
	export default{
		name:"product-1-2",
		data(){
			return{
				tableData:[],
				sum:0,
				dates:[],
			}
		},
		created(){
			this.getData();
		},
		components: {
		  	
	  	},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		filters:{
			getDate1(v){
				return v + '天';
			}
		},
		methods:{
			init(){
				
			},
			//获取数据
			getData(){
				//订单信息
				this.$http({
				  	method:'get',
				  	url: GETORDERINFO + '1000',
				  	data:{
				  		page:1
				  	},
				}).then((res)=>{
					this.tableData = res.data.data.data;
					this.getSum();
					//console.log(this.tableData)
				}).catch((err)=>{
					console.log(err)
				});
			},
			getSum(){
				this.tableData.forEach((v,i)=>{
					this.dates.push( Math.ceil( (v.end_time - v.start_time)/3600/24 ));
					if(v.type == 1){						
						this.sum += v.car_seat * 1.5 * this.dates[i];
					}else{
						this.sum += v.car_seat * 2.5 * this.dates[i];
					}
				})
			},
			viewC(id){
				this.$emit("ViewChang",'P1',id);
			},
			//信息提交
 			submitForm(){
 				
      		},
		}
	}
</script>
