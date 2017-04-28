var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var marked = require('marked')
var highlightJs =  require('highlight.js')
var blogModel = require('../models/blog.model')
var commentModel = require('../models/comment.model')
var moment = require('moment')
marked.setOptions({
	renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return highlightJs.highlightAuto(code).value
  }
});


// router.post('/',function(req,res,next){
// 	var id = req.body.id,
// 			type = req.body.type
// 	fs.readFile(path.resolve(__dirname,'../data/'+type+'List/'+id+'.md'),'utf-8',function(err,data){
// 		if(err){
// 			throw err
// 		}
// 		res.json({
// 			article:marked(data)   //data是字符串 需要转json对象
// 		})
// 	})
// })

//暂未区分daily
router.post('/',function(req,res,next){
	var _id = req.body.id
  // 增加pv
  blogModel.updatePv(_id)
	blogModel.getOne(_id,function(doc){
		doc.content = marked(doc.content)
		res.json({
			blog:doc
		})
	})
})

/* 提取评论列表 */ 
router.post('/getComments',function(req,res,next){
  var title = req.body.title
  commentModel.getlist(title,function(err,docs){
    if(err){
        console.error(err)
    }
    var comments = [];
    docs.map(function(v,i){
      comments.push(v.comment)
    })
    res.json({
      comments:comments
    })
  })
})

/* 增加评论 */
router.post('/createComment',function(req,res,next){
  var title = req.body.title,
      commenter = req.body.commenter,
      content = req.body.content,
      create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
      ip = req.connection.remoteAddress
  var comment = {
    title:title,
    comment:{
      commenter:commenter,
      content:content,
      create_time:create_time,
      ip:ip
    }
  }
  commentModel.create(comment,function(err,doc){
      if(err){
        console.error(err)
        res.json({
          status:'failed',
        })
      }else {
        res.json({
          status:'succeed',
          comment:doc.comment
        })
      }
    }
  )
})

module.exports = router 