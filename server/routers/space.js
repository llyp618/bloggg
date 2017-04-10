var express = require('express')
var blogModel = require('../models/blog.model')
var moment = require('moment')
var router = express.Router()
var SECRET = 'secret'
// token 验证
router.post('/space_auth',function(req,res,next){
	res.set('Access-Control-Expose-Headers', 'access-token')
	var unAuth = true
	var token = req.headers['access-token']
	if(token == SECRET) {
		unAuth = false

	}
	if(unAuth){
		res.sendStatus(401)
	} else {
		res.sendStatus(200)
	}
})
//登录
router.post('/space_login',function(req,res,next){
	res.set('Access-Control-Expose-Headers','access-token')
	var account = req.body.account
	var password = req.body.password
	if(account != '1' || password != '1') {
		res.json({
			status:0,
			msg:'账号或密码错误!'
		})
	}else {
		res.set('access-token',SECRET)
		res.json({
			status:1,
			msg:'登录成功!'
		})
	}
})
// 新建博客文章
router.post('/blog_create',function(req,res,next){
	var title = req.body.title
	var classify = req.body.classify
	var content = req.body.content
	var create_time = moment().format('YYYY-MMMM-Do,h:mm:ss')
	blogModel.create({
		title:title,
		classify:classify,
		content:content,
		create_time:create_time
	},function(status){
		if(status == 'failed') {
			res.json({
				status:0
			})
		}else if (status == 'success'){
			res.json({
				status:1
			})
		}
	})
})

router.post('/blog_modify',function(req,res,next){
	var _id = req.body._id
	blogModel.getOne(_id,function(doc){
		res.json({
			blog:doc
		})
	})
})













module.exports = router