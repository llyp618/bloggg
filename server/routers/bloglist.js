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

router.post('/',function(req,res,next){
	var currentPage = req.body.currentPage
	var classify = req.body.classify
	var filter = {$nor:[{classify:'Daily'}]}
	if(classify != 'all'){
		filter = {classify:classify}
	}
	blogModel.getList(currentPage,filter,['-__v','-content'],function(result,totalPages){
		res.json({
			blogs:result,
			totalPages:totalPages
		})
	});
})

module.exports = router