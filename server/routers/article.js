var express = require('express')
var router = express.Router();
var fs = require('fs');
var path = require('path');
router.post('/',function(req,res,next){
	var id = req.body.id;
	fs.readFile(path.resolve(__dirname,'../data/article.json'),'utf-8',function(err,data){
		if(err){
			throw err
		}
		res.json({
			article:JSON.parse(data)[id]   //data是字符串 需要转json对象
		})
	})
})
module.exports = router;