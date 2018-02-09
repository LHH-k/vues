<template>
	<div id="finance-1" style="padding-bottom: 30px;">
		<el-row :gutter="20" class="list">
			<el-col :span="6">
				<div class="grid-content bg-purple" style="background: #5eb95e;">
					<img src="../assets/images/cy_bg.png" alt="" />
					<div class="c_p">
						<div class="c_p_t">账户当前余额</div>
						<div class="c_p_c">{{moneys[0] | getMoney}}</div>
						<div class="c_p_b">查看余额明细</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple" style="background: #1786aa;">
					<img src="../assets/images/cy_bg.png" alt="" />
					<div class="c_p">
						<div class="c_p_t">代充值金额</div>
						<div class="c_p_c">{{moneys[1] | getMoney}}</div>
						<div class="c_p_b">查看明细</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple" style="background: #f37b1d;">
					<img src="../assets/images/cy_bg.png" alt="" />
					<div class="c_p">
						<div class="c_p_t">当月支出</div>
						<div class="c_p_c">{{moneys[2] | getMoney}}</div>
						<div class="c_p_b">查看当月明细</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple" style="background: #13b5b1;">
					<img src="../assets/images/cy_bg.png" alt="" />
					<div class="c_p">
						<div class="c_p_t">当日支出</div>
						<div class="c_p_c">{{moneys[3] | getMoney}}</div>
						<div class="c_p_b">查看当日明细</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<style type="text/css">
	.list .el-col img{width: 100%;display: block;}
	.list .el-col .bg-purple{position: relative;color: #fff;}
	.list .el-col .bg-purple .c_p{position: absolute;left: 0;top: 0;width: 100%;height: 100%;padding: 15px;}
	.list .c_p .c_p_t{font-size: 22px;}
	.list .c_p .c_p_c{font-size: 40px;line-height: 2;}
	.list .c_p .c_p_b{font-size: 20px;position: absolute;right: 15px;bottom: 15px;border-radius: 30px;line-height: 30px;border: 3px solid #fff;padding: 0 15px;cursor: pointer;}
	@media only screen and (max-width:1550px) {
		.list .c_p .c_p_t{font-size: 18px;}
		.list .c_p .c_p_c{font-size: 30px;}
		.list .c_p .c_p_b{font-size: 16px;}
	}
</style>
<script>
	import "../filters";
	export default {
		name: "finance-1",
		data() {
			return {
				moneys:[250000,2154554,54545,545454]
			}
		},
		components: {

		},
		created() {
			this.getData();
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			}.bind(this))
		},
		filters: {

		},
		methods: {
			init() {

			},
			getData() {

			},
		}
	}
</script>