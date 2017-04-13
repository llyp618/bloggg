var express = require('express')
var blogModel = require('../models/blog.model')
var classifyModel = require('../models/classify.model')
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
// 新建博客文章(修改)
router.post('/blog_create_modify',function(req,res,next){
	var title = req.body.title,
	    classify = req.body.classify,
	    content = req.body.content
	    _id = req.body._id,
	    info = req.body.info,
	    create_time = moment().format('YYYY-MM-DD, HH:mm:ss')
	var blog = {
		title:title,
		classify:classify,
		content:content,
		info:info,
		create_time:create_time
	}
	//如果_id不为空 则修改 
	if ( _id != '' && _id.length != 0){
		blogModel.modifyOne(blog,_id,function(status){
			if(status == 'failed') {
				res.json({
					status:0
				})
			}else if (status == 'success'){
				classifyModel.add(classify)  //添加文章类型表
				res.json({
					status:1
				})
			}
		})
		return false;
	}
	blogModel.create(blog,function(status){
		if(status == 'failed') {
			res.json({
				status:0
			})
		}else if (status == 'success'){
			classifyModel.add(classify)
			res.json({
				status:1
			})
		}
	})
})

router.post('/blog_getOne',function(req,res,next){
	var _id = req.body._id
	blogModel.getOne(_id,function(doc){
		res.json({
			blog:doc
		})
	})
})


//获取文章列表
router.post('/bloglist',function(req,res,next){
	var currentPage = req.body.currentPage
	var classify = req.body.classify
	var filter = {}
	if(classify != 'all'){
		filter = {classify:classify}
	}
	blogModel.getList(currentPage,filter,['-__v','-content'],function(result,totalPages){
		res.json({
			blogs:result,
			totalPages:totalPages
		})
	})
})

// //添加了分页的文章列表
// router.post('/bloglist_page',function(req,res,next){
// 	blogModel.getListPage(currentPage,{},['-__v','-content'],function(docs){
// 		res.json({
// 			blogs:docs
// 		})
// 	})
// })


// 删除文章
router.post('/blog_delete',function(req,res,next){
	var _id = req.body._id
	blogModel.removeOne(_id,function(status,clfy){
		if(status == 'failed') {
			res.json({
				status:0
			})
		}else if (status == 'success'){
			classifyModel.delete(clfy)  //如果被删除文章类目下没有文章了，删除该类目
			res.json({
				status:1
			})
			// blogModel.getList(currentPage,{},['-__v','-content'],function(docs,totalPages){
			// 	res.json({
			// 		blogs:docs,
			// 		totalPages:totalPages,
			// 		status:1
			// 	})
			// });
		}
	})
})
// 获取分类
router.get('/blog_classify_list',function(req,res,next){
	classifyModel.getList(function(status,docs){
		if(status == 'failed'){
			res.json({
				classifyList:[]
			})
			return false
		}
		var list = docs.map(function(v,i){
			return v.classify
		})
		res.json({
			classifyList:list
		})
	})
})





module.exports = router