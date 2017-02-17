var express = require('express')
var router = express.Router();
var fs = require('fs');
var path = require('path');
router.get('/',function(req,res,next){
	fs.readFile(path.resolve(__dirname,'../data/blogList.json'),'utf-8',function(err,data){
		if(err){
			throw err
		}
		res.json({
			blogList:JSON.parse(data)  //data是字符串 需要转json对象
		})
	})
})

module.exports = router;