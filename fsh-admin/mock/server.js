var app = require('koa')();
var router = require('koa-router')();

//console.log(app,router)
var test = require('./test');
router.get('/test',function *(next){
	console.log('TEST!');
	this.body = test;
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
