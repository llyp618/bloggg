var express = require('express');
var compress = require('compression');
var path = require('path');	
var routers = require('./routers');
var bodyParser = require('body-parser');   //处理请求 json数据的中间件
var config = require('config-lite');

//server render
var routes = require('../src/routes');
var  renderToString = require('react-dom/server').renderToString;
var React = require('react');
var match = require('react-router').match;
var RouterContext  = require('react-router').RouterContext ;

var injectTapEventPlugin = require( 'react-tap-event-plugin'); 
injectTapEventPlugin();
global.navigator = { userAgent: 'all' }; //material-ui   server render ua

var app = express();
app.use(compress());
app.use(express.static(path.resolve(__dirname, '../dist'),{index:false}));  //修改静态资源路径
app.use(bodyParser());

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
       <!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="UTF-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="keywords" content="React Blog,React 博客,React+Node.js,React+express">
	    <meta name="description" content="由React+Express+MongoDB搭建的个人博客">
	    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
	    <title>Lu的博客</title>
	    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_muh7h53d0tpam7vi.css">
           <link href="/styles.css" rel="stylesheet"></head>
	  <body>
	  	<div id="app"> ${appHtml}</div>
	  	</div><script type="text/javascript" src="/vendor.bundle.js"></script><script type="text/javascript" src="/bundle.js"></script></body>
	</html>
   `
}
routers(app);

var server = app.listen(config.port,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at port:',  port);
});
