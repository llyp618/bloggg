var express = require('express')
var blogModel = require('../models/blog.model')
var config = require('config-lite')
var classifyModel = require('../models/classify.model')
var commentModel = require('../models/comment.model')
var moment = require('moment')
var router = express.Router()
var sha1 = require('sha1')
var jwt = require('jsonwebtoken')
// token 验证
router.post('/space_auth',function(req,res,next){
	res.set('Access-Control-Expose-Headers', 'access-token')
	var unAuth = true
	var token = req.headers['access-token']
	// if(token == SECRET) {
	// 	unAuth = false

	// }
	jwt.verify(token,config.token.secret,function(err,decoded){
		if(err){
			res.sendStatus(401)
		}else {
			res.sendStatus(200)
		}
	})
	// if(unAuth){
	// 	res.sendStatus(401)
	// } else {
	// 	res.sendStatus(200)
	// }
})
//登录
router.post('/space_login',function(req,res,next){
	res.set('Access-Control-Expose-Headers','access-token')
	var account = req.body.account
	var password = req.body.password
	if(sha1(account) != config.account || sha1(password) != config.password) {
		res.json({
			status:0,
			msg:'账号或密码错误!'
		})
	}else {
		var token = jwt.sign({key:config.token.key},config.token.secret,{expiresIn:config.token.expireTime})
		res.set('access-token',token)
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
	    content = req.body.content,
	    _id = req.body._id,
	    info = req.body.info,
	    create_time = moment().format('YYYY-MM-DD HH:mm:ss')
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
	// 增加个pv数
	blog.pv = 0;
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

// 获取评论
router.post('/get_comments',function(req,res,next){
	var title = req.body.title
	var currentPage  = req.body.currentPage
	if( title == 'all' ) {
		title = /.*/ig;
	}
	commentModel.space_getlist(title,currentPage,function(err,docs){
    if(err){
      console.error(err)
    }
    commentModel.space_getlistcount(title,function(err,count){
    	res.json({
	      comments:docs,
	      totalPages:Math.ceil(count / 20)
	    })
    })
    
  })
})
// 删除评论
router.post('/delete_comment',function(req,res,next){
	var _id = req.body._id
	commentModel.delete(_id,function(err){
		if(err){
			console.error(err)
			res.json({
				status:'failed'
			})
		}else {
			res.json({
				status:'succeed'
			})
		}
	})
})

//获取所有文章标题
router.get('/get_titles',function(req,res,next){
	commentModel.get_titles(function(err,docs){
		if(err) console.error(err)
		var titles = [],titleJson = {}
		docs.map(function(v,i){
			if(!titleJson[v.title]){
				titles.push(v.title)
				titleJson[v.title] = 1
			}
		})
		res.json({
			titleSources:titles
		})
	})
})

module.exports = router