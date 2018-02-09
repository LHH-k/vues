<template>
	<div id="product-1" style="background: #fff;padding-bottom: 30px;">
		<component :is="currentView" :modifyId="modifyId" @ViewChang='xxChange'></component>
	</div>
</template>
<style type="text/css">
	.el-form-item{margin-bottom: 18px;}
	.tit{padding:15px 20px;font-size: 20px;line-height: 36px;border-bottom: 2px solid #e1e1e1;}
	.stit{font-size: 18px;padding-bottom: 15px;border-bottom: 2px solid #E1E1E1;}
	.boxs,.submit-box{padding:0 24px;}
	.box{padding: 15px 0 10px;}
	.box-c{overflow: hidden;padding-top: 24px;}
	.statement{color: #e80000;font-size: 12px;margin-top: 20px;}
	.mytool{}
	.mytool li{width: 220px;overflow: hidden;line-height: 1.5;}
	.mytool li span:last-child{float: right;}
	#product-1 .el-dialog__header{display: none;}
	#product-1 .el-dialog--center .el-dialog__body{padding: 0;text-align: center;}
	.tableH th{text-align: center;background:#409EFF; color: #fff;}
	.cur{color: #fff !important;background-color: #409EFF !important;border-color: #409EFF !important;}
</style>
<script>
	import '../filters';
	import P1 from './product-1-1';
	import P2 from './product-1-2';
	export default{
		name:"product-1",
		data(){
			return{
				currentView:"P1",
				modifyId:null,
			}
		},
		components:{
			"P1":P1,
			"P2":P2
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
			getMoney(v){
				return v.toFixed(2);
			},
		},
		methods:{
			init(){
				
			},
			getData(){
				
			},
			xxChange(msg,id){
				this.currentView = msg;
				this.modifyId = id;
			},
		}
	}
</script>
