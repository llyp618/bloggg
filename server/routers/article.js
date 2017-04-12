var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var marked = require('marked')
var highlightJs =  require('highlight.js')
var blogModel = require('../models/blog.model')

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
	blogModel.getOne(_id,function(doc){
		doc.content = marked(doc.content)
		res.json({
			blog:doc
		})
	})
})

module.exports = router