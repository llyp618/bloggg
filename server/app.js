var express = require('express');
var path = require('path');	
var routers = require('./routers');

var app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));  //修改静态资源路径

app.get('/',function(req,res){
	res.sendFile(path.resolve(__dirname,'../dist/index.html'));
});

routers(app);

var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
});
