var express = require('express')
var router = express.Router()
var blogModel = require('../models/blog.model')

router.get('/',function(req,res,next){
	blogModel.getList({classify:'daily'},['-__v','-content'],function(docs){
		res.json({
			blogs:docs
		})
	});
})

module.exports = router