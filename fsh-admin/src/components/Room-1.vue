<template>
	<div id="room-1">		
		<!--头部-->
		<el-row style="background: #fafafa;padding: 20px;border-bottom: 1px solid #d7d7d7;">
		  <el-col :span="16">
		  	<ul class="top-list">
		  		<li v-for="item in myData1" :class="{'active':item.isCur}" @click="">
		  			<span>{{item.name}}</span>（<span>{{item.num1}}</span>/<span>{{item.num2}}</span>）
		  		</li>
		  	</ul>
		  </el-col>
		  <el-col :span="8" style="text-align: right;">
		  	<el-button type="primary" icon="el-icon-plus" size="mini" round @click="">导入</el-button>
		  	<el-button type="primary" icon="el-icon-plus" size="mini" round @click="">添加</el-button>
		  	<el-button type="primary" icon="el-icon-printer" size="mini" round @click="">批量打印</el-button>
		  	<span style="display: inline-block;margin-left: 5px;">
		  		<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			      	<el-button type="" size="mini" round>更多<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item><i class="el-icon-download" style="margin-right: 5px;"></i>导出Excel</el-dropdown-item>
			        <el-dropdown-item><i class="el-icon-remove" style="margin-right: 5px;"></i>批量删除</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
		  	</span>
		  </el-col>
		</el-row>
		<!--主要内容-->
		<div style="background: #fff;padding: 20px;">
			<el-row style="">
				<el-col :span="7">
					<el-input placeholder="房间号/租客名" v-model="search1" clearable  size="mini" style="width: 35%;"></el-input>
				  	<el-select v-model="floors" clearable size="mini" style="width: 30%;" placeholder="请选择楼层">
					    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
				  	</el-select>
				  	<el-button round size="mini" icon='el-icon-search' type='primary' style="">查找</el-button>
				</el-col>		
				<el-col :span="17">
					<ul class="fangyuan-list">
						<li :class="{'active':fy_style==1}" @click="getDate_for_style(1)" class="unSelet">
							<div>
								<i class="iconfont icon-fangyuan" style="font-size: 18px;"></i>
							</div>
							<div>
								<div>未出租</div>
								<div>{{tableData_1.length}}间</div>
							</div>
						</li>
						<li :class="{'active':fy_style==2}" @click="getDate_for_style(2)" class="unSelet">
							<div>
								<i class="iconfont icon-fangyuan" style="font-size: 18px;"></i>
							</div>
							<div>
								<div>已出租</div>
								<div>{{tableData_2.length}}间</div>
							</div>
						</li>
						<li :class="{'active':fy_style==3}" @click="getDate_for_style(3)" class="unSelet"> 
							<div>
								<i class="iconfont icon-qiandai"></i>
							</div>
							<div>
								<div>已交租</div>
								<div>{{tableData_3.length}}间</div>
							</div>
						</li>
						<li :class="{'active':fy_style==4}" @click="getDate_for_style(4)" class="unSelet">
							<div>
								<i class="iconfont icon-08"></i>
							</div>
							<div>
								<div>未交租</div>
								<div>{{tableData_4.length}}间</div>
							</div>
						</li>
						<li :class="{'active':fy_style==5}" @click="getDate_for_style(5)" class="unSelet">
							<div>
								<i class="iconfont icon-hetongdaoqi"></i>
							</div>
							<div>
								<div>合同到期</div>
								<div>{{tableData_5.length}}间</div>
							</div>
						</li>
					</ul>
				</el-col>
			</el-row>
			<div class="data-styles">
				<span :class='{"active":showStyle==1}' @click="showStyle=1">列表模式</span> |
				<span :class='{"active":showStyle==2}' @click="showStyle=2">图形模式</span>
			</div>
			<div class="tables" v-if="showStyle==1">
				<table>
					<tr>
						<th style="width: 12%;">房间号</th>
						<th style="width: 9%;">租客姓名</th>
						<th style="width: 8%;">电话</th>
						<th style="width: 16%;">合约时间</th>
						<th style="width: 8%;">房间风格</th>
						<th style="width: 15%;">本次租金<span>（交租时间）</span></th>
						<th style="width: 14%;">备注</th>
						<th style="width: 18%;">操作</th>
					</tr>
					<tr v-for="item in tableData">
						<td>
							<div v-if="item.fy_s==1" class="icon-box small" style="background: #b8b8b8;">
								<i class="iconfont icon-fangyuan" style="font-size: 12px;"></i>
							</div>
							<div v-if="item.fy_s==2" class="icon-box small" style="background: #75b0f1;">
								<i class="iconfont icon-fangyuan" style="font-size: 12px;"></i>
							</div>
							<div v-if="item.fy_s==3" class="icon-box small" style="background: #b5d469;">
								<i class="iconfont icon-qiandai"></i>
							</div>
							<div v-if="item.fy_s==4" class="icon-box small" style="background: #f9996f;">
								<i class="iconfont icon-08"></i>
							</div>
							<div v-if="item.fy_s==5" class="icon-box small" style="background: #f7b23c;">
								<i class="iconfont icon-hetongdaoqi"></i>
							</div>
							{{item.num}}<span>({{item.fy_fx}})</span></td>
						<td>{{item.name}}<span v-if="item.gender">({{item.gender}})</span><span v-else>未出租</span></td>
						<td>{{item.phone}}</td>
						<td><div :class="{'color-db850b':item.fy_s==5||item.fy_s==2}">{{item.time_start}} ~ {{item.time_end}}</div></td>
						<td>{{item.fy_fg}}</td>
						<td>
							<div v-if="item.fy_s==2">								
								定金：<span>{{item.money | getMoney}}</span><b style="color: #75b0f1; font-weight: normal;">(已预订)</b>
							</div>
							<div v-if="item.fy_s==3">								
								{{item.money | getMoney}}<span>({{item.get_time}} 已收)</span>
							</div>
							<div v-else-if="item.fy_s==4"  style="color:#f15352;">								
								{{item.money | getMoney}}<span  style="color:#f15352;">(逾期5天)</span>
							</div>
							<div v-else-if="item.fy_s==5"  style="color:#f15352;">								
								{{item.money | getMoney}}<span  style="color:#f15352;">(逾期100天)</span>
							</div>
						</td>
						<td>
							<el-input type="textarea" autosize placeholder="点击备注" v-model="item.remarks" size="mini" @blur="remarkChange(item.id,item.remarks)" style=""></el-input>
						</td>
						<td>
							<ul v-if="item.fy_s==1">
								<li>
									<a>出租</a> |
									<a>预订</a> |
									<a>合约历史</a> |
									<a>费用</a> 
								</li>
							</ul>
							<ul v-else-if="item.fy_s==2">
								<li>
									<a>出租</a> |
									<a>取消预订</a> |
									<a>合约</a> |
									<a>租客</a> |
									<a>费用</a>
								</li>
							</ul>
							<ul v-if="item.fy_s==3">
								<li>
									<a>再收</a> |
									<a>退租</a> |
									<a>合约</a> |
									<a>租客</a> |
									<a>费用</a> 
								</li>
							</ul>
							<ul v-else-if="item.fy_s==4">
								<li>
									<a>收租</a> |
									<a>退租</a> |
									<a>合约</a> |
									<a>租客</a> |
									<a>费用</a> 
								</li>
							</ul>
							<ul v-else-if="item.fy_s==5">
								<li>
									<a>收租</a> |
									<a>退租</a> |
									<a>合约</a> |
									<a>租客</a> |
									<a>费用</a> 
								</li>
							</ul>
						</td>
					</tr>
				</table>
			</div>
			<div class="charts" v-else-if="showStyle==2">
				<ul class="ul">
					<li v-for="item in tableData" :class="getBg(item.fy_s)">
						<div class="right-text">
							<span v-if="item.fy_s==1" style="background: #b8b8b8;">未出租</span>
							<span v-else-if="item.fy_s==2" style="background: #75b0f1;">已出租</span>
							<span v-else-if="item.fy_s==3" style="background: #b5d469;">已交租</span>
							<span v-else style="background: #f9996f;">未交租</span>
						</div>
						<div class="chart-top">
							<div class="top-num">
								<b>{{item.num}}</b>
								<span>({{item.fy_fx}})</span>
							</div>
							<div class="top-name">
								<div v-if="item.fy_s==1">
									{{item.money | getMoney}} 元/月
								</div>
								<div v-else>									
									<i class="iconfont icon-renwu"></i>
									<div>{{item.name}}</div>
									<div>{{item.phone}}</div>
									<span v-if="item.fy_s==2" style="color: #fff;display: inline-block;padding: 0 5px;background: #75b0f1;">预定</span>
								</div>
							</div>
							<div style="line-height: 2;">
								{{item.fy_fg}}
							</div>
							<div class="top-money">
								<div v-if="item.fy_s==2">
									<span>(定金：{{item.money | getMoney}}元)</span>
								</div>
								<div v-else-if="item.fy_s==3">
									{{item.money | getMoney}}元
									<span>({{item.get_time}})</span>
								</div>
								<div v-else-if="item.fy_s==4 || item.fy_s==5" style="color: #f15352;">
									{{item.money | getMoney}}元
									<span style="color: #f15352;">(逾期100天) <i v-if="item.fy_s==5" style="color: #fff;display: inline-block;padding: 0 5px;background: #f9996f;">到期</i></span>
								</div>
								<div v-else="" style="visibility: hidden;">
									  空白
								</div>
							</div>
						</div>
						<div class="chart-bottom" style="">
							<div>
								<span v-if="item.fy_s==1 || item.fy_s==2">										
									<i class="iconfont icon-chu"></i>
									<b>出租</b>
								</span>
								<span v-if="item.fy_s==1">										
									<i class="iconfont icon-ding"></i>
									<b>预订</b>
								</span>
								<span v-if="item.fy_s==2">										
									<i class="iconfont icon-daochu"></i>
									<b>取消预订</b>
								</span>
								<span v-if="item.fy_s!=1 && item.fy_s!=2">										
									<i class="iconfont icon-shouqian"></i>
									<b v-if="item.fy_s==3">再收</b>
									<b v-else>收租</b>
								</span>
								<span v-if="item.fy_s!=1 && item.fy_s!=2">
									<i class="el-icon-remove-outline"></i>									
									<b>退租</b>
								</span>
								<span>										
									<i class="iconfont icon-heyue"></i>
									<b v-if="item.fy_s==1">合约历史</b>
									<b v-else>合约</b>
								</span>
								<span v-if="item.fy_s!=1">										
									<i class="iconfont icon-gerenkehu"></i>
									<b>租客</b>
								</span>
								<span>										
									<i class="iconfont icon-feiyong"></i>
									<b>费用</b>
								</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"room-1",
		data(){
			return{
				myData1	: 	[],		//租房区域
				search1 : 	'',		//搜索关键字1
		        options1: 	[],		//楼层选项
			    floors 	: 	'',		//默认选择
			    fy_style : 	0,		//房源类型
			    tableData:	[],		//展示在table上的数据
			    tableDataAll:[],	//所有数据
			    tableData_1:[],		//未出租
			    tableData_2:[],		//已出租
			    tableData_3:[],		//已交租
			    tableData_4:[],		//未交租
			    tableData_5:[],		//合同到期
			    showStyle:	1,		//显示表格还是图形
			}
		},
		created(){
			this.getDate();
		},
		mounted: function () {
		  	this.$nextTick(function(){
		  		this.init();	
		  	}.bind(this))
		},
		filters:{
			getMoney(v){
				return v.toFixed(2);
			},
		},
		methods:{
			init(){
				
			},
			//获取数据
			getDate(){
				//区域
				const item = {
			        name: '天誉',
			        num1: 1,
			        num2: 2,
			        isCur:false,
		      	};
		      	this.myData1 = Array(20).fill(item);
		      	//楼层
		      	this.options1 = [
		        	{
			          value: 'all',
			          label: '全部楼层'
			        }, {
			          value: '1',
			          label: '1楼'
			        }, {
			          value: '2',
			          label: '2楼'
			        }, {
			          value: '3',
			          label: '3楼'
			        }, {
			          value: '4',
			          label: '4楼'
			        }, {
			          value: '5',
			          label: '5楼'
		        	}
			    ];
		      	this.floors = 'all';
		      	var table = [
		      		{
		      			id:1,
			      		fy_s : 1,
				        num: 101,
				        fy_fx:'两室一厅',
				        name: '',
				        gender:'',
				        phone: '12345627829',
				        time_start:'',
				        time_end:'',
				        fy_fg:'欧式简约风',
				        money: 1000,
				        get_time:'',
				        remarks:'jj',
		      		},{
		      			id:2,
			      		fy_s : 2,
				        num: 102,
				        fy_fx:'两室一厅',
				        name: '测试1',
				        gender:'男',
				        phone: '12345627829',
				        time_start:'2017-11-30',
				        time_end:'2018-11-30',
				        fy_fg:'欧式简约风',
				        money: 1000,
				        get_time:'12-03',
				        remarks:'jj',
		      		},{
		      			id:3,
			      		fy_s : 3,
				        num: 103,
				        fy_fx:'两室一厅',
				        name: '测试1',
				        gender:'男',
				        phone: '12345627829',
				        time_start:'2017-11-30',
				        time_end:'2018-11-30',
				        fy_fg:'欧式简约风',
				        money: 1000,
				        get_time:'12-03',
				        remarks:'jj',
		      		},{
		      			id:4,
			      		fy_s : 3,
				        num: 104,
				        fy_fx:'两室一厅',
				        name: '测试2',
				        gender:'男',
				        phone: '12345627829',
				        time_start:'2017-11-30',
				        time_end:'2018-11-30',
				        fy_fg:'日式简约风',
				        money: 1200.0012,
				        get_time:'12-04',
				        remarks:'',
		      		},{
		      			id:5,
			      		fy_s : 4,
				        num: 105,
				        fy_fx:'一室一厅',
				        name: '测试3',
				        gender:'男',
				        phone: '12345623829',
				        time_start:'2017-11-30',
				        time_end:'2018-11-30',
				        fy_fg:'欧式简约风',
				        money: 1000,
				        get_time:'',
				        remarks:'',
		      		},{
		      			id:6,
			      		fy_s : 5,
				        num: 106,
				        fy_fx:'两室一厅',
				        name: '测试1',
				        gender:'男',
				        phone: '12345627829',
				        time_start:'2017-11-30',
				        time_end:'2018-11-30',
				        fy_fg:'欧式简约风',
				        money: 1000,
				        get_time:'12-03',
				        remarks:'jj',
		      		},
		      	];
		      	
//		      	for(let i=0 ; i<2 ;i++){
//		      		table = table.concat(table);
//		      	}
		      	this.tableDataAll = table;
	      		this.tableData = this.tableDataAll;
		      	table.forEach((v,i)=>{
		      		switch (v.fy_s){
						case 1: this.tableData_1.push(v);
							break;
						case 2: this.tableData_2.push(v);
							break;
						case 3: this.tableData_3.push(v);
							break;
						case 4: this.tableData_4.push(v);
							break;
						case 5: this.tableData_5.push(v);
							break;
					}
		      	})
			},
			//房源类型选择获取数据
			getDate_for_style(v){
				if(this.fy_style == v){
					v = 0;
				}
				switch (v){
					case 1:
						this.fy_style=1;
						this.tableData = this.tableData_1;
						break;
					case 2:
						this.fy_style=2;
						this.tableData = this.tableData_2;
						break;
					case 3:
						this.fy_style=3;
						this.tableData = this.tableData_3;
						break;
					case 4:
						this.fy_style=4;
						this.tableData = this.tableData_4;
						break;
					case 5:
						this.fy_style=5;
						this.tableData = this.tableData_5;
						break;
					default:
						this.fy_style=0;
						this.tableData = this.tableDataAll;
						break;
				}
			},
			//备注改变后
			remarkChange(id,v){
				console.log(id,v)
			},
			//图形模式的背景色
			getBg(v){
				if(v==1){
					return 'bg1'
				}else if(v==2){
					return 'bg2'
				}else if(v==3){
					return 'bg3'
				}else if(v==4){
					return 'bg4'
				}else if(v==5){
					return 'bg5'
				}
			}
		}
	}
</script>
<style type="text/css">
	.color-db850b{color: #db850b;}
	#room-1{}
	#room-1 .el-button+.el-button{margin-left: 5px;}
	#room-1 .top-list li{display: inline-block; margin-right: 10px;line-height: 30px;cursor: pointer;color: #A3A3A3;box-sizing: border-box;}
	#room-1 .top-list li span:last-child{color: #3498db;}
	#room-1 .top-list li.active{border-bottom: 1px solid #3498DB;}
	#room-1 .top-list li.active, .top-list li.active span{color: coral;}
	#room-1 .top-list li.active span:first-child{color: #3498db;}
	#room-1 .el-input{width: auto;}
	#room-1 .el-input input{border-radius: 12px;}
	#room-1 .fangyuan-list{overflow: hidden;}
	#room-1 .fangyuan-list li{float: left;padding:8px 15px; background: #f6f6f6;border-radius: 10px;margin-right: 15px;cursor:pointer;border: 1px solid transparent;overflow: hidden;}
	#room-1 .fangyuan-list li.active{border-color: #f15352;position: relative;background: #fff !important;}
	#room-1 .fangyuan-list li.active:after{position: absolute;content: "";right: 0;bottom: 0;border-right: 18px solid #F15352;border-bottom: 16px solid #F15352;border-top:16px solid transparent;border-left: 18px solid transparent;z-index: 1;}
	#room-1 .fangyuan-list li.active:before{position: absolute;content: "✔";font-size: 18px;color: #fff;right: 2px;bottom: 0;z-index: 2;}
	#room-1 .fangyuan-list li:nth-child(2){background: #d3e1f1;}
	#room-1 .fangyuan-list li:nth-child(3){background: #f8ffe6;}
	#room-1 .fangyuan-list li:nth-child(4){background: #fee5e4;}
	#room-1 .fangyuan-list li:nth-child(5){background: #fef6ec;}
	#room-1 .fangyuan-list .iconfont{color: #fff;font-size: 22px;margin: 0;line-height: 1;}
	#room-1 .fangyuan-list li > div{display: inline-block;vertical-align: middle;}
	#room-1 .fangyuan-list li > div:first-child{width: 40px;height: 40px;line-height: 40px;text-align: center;border-radius: 50%;background: #b8b8b8;margin-right: 5px;}
	#room-1 .fangyuan-list li:nth-child(2) > div:first-child{background: #75b0f1;}
	#room-1 .fangyuan-list li:nth-child(3) > div:first-child{background: #b5d469;}
	#room-1 .fangyuan-list li:nth-child(4) > div:first-child{background: #f9996f;}
	#room-1 .fangyuan-list li:nth-child(5) > div:first-child{background: #f7b23c;}
	#room-1 .fangyuan-list li > div:last-child{font-size: 14px;color: #505050;line-height: 22px;}
	#room-1 .fangyuan-list li > div:last-child div:last-child{font-size: 14px;color: #8a8a8a;line-height: 18px;}
	
	.tables table{width: 100%;margin: 20px 0;border-collapse: collapse;}
	.tables td,.tables th{border: 1px solid #ededed;padding: 8px 5px;line-height: 24px;}
	.tables td span,.tables th span{color: #8f8f8f;}
	.tables th{background: #f2f2f2; color: #333;font-weight: normal;font-size: 14px;text-align: left;line-height: 30px;}
	.tables tr{ cursor: auto;transition: background-color .25s ease;}
	.tables tr:hover{background-color: #f5f7fa;}
	.tables td{}
	.tables td .el-input{width: 100% !important;}
	.tables td .icon-box{display: inline-block;width: 22px;height: 22px;vertical-align: middle;border-radius: 50%;}
	.tables td .icon-box .iconfont{font-size: 14px;color: #fff;line-height: 18px;width: 100%;height: 100%;}
	
	.charts{}
	.charts .ul{margin: 20px 0;overflow: hidden;}
	.charts .ul > li{float: left; margin: 10px 20px;width: 260px;border: 1px solid #afafaf;border-radius: 5px;position: relative;overflow: hidden;cursor: pointer;color: #343434;font-size: 14px;}
	.charts .ul .chart-top{padding: 5px 10px;}
	.charts .ul .chart-top span{color: #929292;}
	.charts .ul .chart-top .top-num b{font-size: 22px;line-height: 1.6;margin-right: 5px;}
	.charts .ul .chart-top .top-name{overflow: hidden;line-height: 1.6;}
	.charts .ul .chart-top .top-name .iconfont{font-size: 16px;margin: 0;}
	.charts .ul .chart-top .top-name > div{overflow: hidden;}
	.charts .ul .chart-top .top-name > div > div{display: inline-block;}
	.charts .ul .chart-top .top-money{line-height: 1.6;margin: 5px 0;overflow: hidden;}
	.charts .ul .chart-top .top-money span{float: right;}
	.charts .ul .chart-bottom{border-top: 1px solid #afafaf;text-align: center;line-height: 34px;font-size: 0;}
	.charts .ul .chart-bottom span{display: inline-block;width:20%;position: relative;}
	.charts .ul .chart-bottom span i{font-size: 22px;margin: 0;opacity: 1;vertical-align: middle;}
	.charts .ul .chart-bottom span b{font-weight: normal;position: absolute;width: 100%;height: 100%;left: 0;top: 0;opacity: 0;font-size: 12px;}
	.charts .ul .chart-bottom:hover span i{opacity: 0;}
	.charts .ul .chart-bottom:hover span b{opacity: 1;}
	.charts .ul > li:hover{border-color: #D85D5E;}
	.charts .ul > li.bg1{background: #f6f6f6;}
	.charts .ul > li.bg2{background: #d3e1f1;}
	.charts .ul > li.bg3{background: #f8ffe6;}
	.charts .ul > li.bg4{background: #fee5e4;}
	.charts .ul > li.bg5{background: #fef6ec;}
	.charts .ul > li .right-text{position: absolute;right: -10px;top: 47px;line-height: 24px;text-align: center;width: 100px;color: #fff;transform:rotate(45deg);transform-origin: right;-webkit-transform:rotate(45deg);-webkit-transform-origin: right;}
	.right-text span{display: block;width: 100%;height: 100%;}
	
	.data-styles{text-align: right;margin-top: 10px}
	.data-styles span{cursor:pointer;}
	.data-styles span.active{color: #4b9df9;}
</style>