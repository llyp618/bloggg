// var express = require('express')
// var router = express.Router()
// var fs = require('fs')
// var path = require('path')
// router.get('/',function(req,res,next){
// 	fs.readFile(path.resolve(__dirname,'../data/blogList.json'),'utf-8',function(err,data){
// 		if(err){
// 			throw err
// 		}
// 		res.json({
// 			blogList:JSON.parse(data)  //data是字符串 需要转json对象
// 		})
// 	})
// })

// module.exports = router
// 

var express = require('express')
var router = express.Router()
var blogModel = require('../models/blog.model')

router.get('/',function(req,res,next){
	blogModel.getList(['-__v','-content'],function(docs){
		console.log(docs)
		res.json({
			blogs:docs
		})
	});
})

module.exports = router