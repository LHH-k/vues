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
});

//时间过滤器//yyyy.mm.dd
	//时间戳转
Vue.filter('getDate_D', function(t) { 
	if(t){
		var d = new Date(parseInt(t + '000'));
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1));
		var D = parseInt(d.getDate() / 10) ? d.getDate() : ("0" + d.getDate());
		return Y + "." + M + "." + D;
	}
});
//时间戳转 YY-MM-DD hh-mm-ss
Vue.filter('get_Date_HMS', function(t) {
	if(t){
		var d = new Date(parseInt(t + '000'));
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
		var D = parseInt(d.getDate() / 10) ? d.getDate() : "0" + d.getDate();
		var h = parseInt(d.getHours() / 10) ? d.getHours() : '0' + d.getHours();
		var m = parseInt(d.getMinutes() / 10) ? d.getMinutes() : '0' + d.getMinutes();
		var s = parseInt(d.getSeconds() / 10) ? d.getSeconds() : '0' + d.getSeconds();
		return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
	}
});
//时间戳转 YY-MM-DD(周W) hh-mm-ss
Vue.filter('get_Date_W', function(t) {
	if(t){
		var d = new Date(parseInt(t + '000'));
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
		var D = parseInt(d.getDate() / 10) ? d.getDate() : "0" + d.getDate();
		var W = d.getDay();
		switch (W) {
			case 1:
				W = '一';
				break;
			case 2:
				W = '二';
			case 3:
				W = '三';
			case 4:
				W = '四';
			case 5:
				W = '五';	
			case 6:
				W = '六';
			case 0:
				W = '日';
		}
		var h = parseInt(d.getHours() / 10) ? d.getHours() : '0' + d.getHours();
		var m = parseInt(d.getMinutes() / 10) ? d.getMinutes() : '0' + d.getMinutes();
		var s = parseInt(d.getSeconds() / 10) ? d.getSeconds() : '0' + d.getSeconds();
		return Y + '-' + M + '-' + D + '（周' + W + '） ' + h + ':' + m + ':' + s;
	}
});
	//Date对象转
Vue.filter('getDateByD', function(d) { 
	if(d){
		var Y = d.getFullYear();
		var M = parseInt((d.getMonth() + 1) / 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1));
		var D = parseInt(d.getDate() / 10) ? d.getDate() : ("0" + d.getDate());
		return Y + "." + M + "." + D;
	}
});