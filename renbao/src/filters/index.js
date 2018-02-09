import Vue from 'vue';
//货币过滤器
Vue.filter('getMoney', function(v) {
	if(v){		
		let ve = parseFloat(v).toFixed(2).toString();
		ve = ve.substr(ve.length - 2);
		let v1 = parseInt(v).toString();
		v1 = v1.split('').reverse();
		let vb = [];
		for(let i = 0; i < v1.length; i++) {
			vb.push(v1[i]);
			if((i + 1) % 3 == 0 && i < v1.length - 1) {
				vb.push(",")
			}
		}
		vb = vb.reverse().join("");
		return '￥' + vb + '.' + ve;
	}
})
//时间过滤器//yyyy.mm.dd
	//时间戳转
Vue.filter('getDate', function(t) { 
	if(t){
		var d = new Date(parseInt(t + '000'));
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1));
		var D = parseInt(d.getDate() / 10) ? d.getDate() : ("0" + d.getDate());
		return Y + "." + M + "." + D;
	}
})
	//Date对象转
Vue.filter('getDateByD', function(d) { 
	if(d){
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1));
		var D = parseInt(d.getDate() / 10) ? d.getDate() : ("0" + d.getDate());
		return Y + "." + M + "." + D;
	}
})