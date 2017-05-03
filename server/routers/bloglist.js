
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