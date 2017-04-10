var Blog = require('../db/mongoose.js').Blog

module.exports = {
	// 新建：
	create:function(blog,cb){
		var blog = new Blog({
			title:blog.title,
			classify:blog.classify,
			create_time:blog.create_time,
			content:blog.content
		})
		return blog.save(function(err){  //保存文档
			if(err){
				console.log(err)
				return cb('failed')
			}else {
				console.log('success')
				return cb('success')
			}
		})
	},
	// 获取列表：
	getList:function(project,cb){
	 	Blog.find({},project,function(err,docs){
	 		if(err){
	 			console.log(err)
	 			return false;
	 		}
	 		return cb(docs)
	 	})
	},
	//获取某一篇文章
	getOne:function(_id,cb){
		Blog.findById(_id,function(err,doc){
			if(err){
				console.log(err)
				return false;
			}
			return cb(doc)
		})
	},
	//删除某一篇文章
	removeOne:function(){},
	//修改某一篇文章
	modifyOne:function(){}
}