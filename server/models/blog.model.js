var Blog = require('../db/mongoose.js').Blog

module.exports = {
	// 新建：
	create:function(blog,cb){
		var blog = new Blog({
			title:blog.title,
			classify:blog.classify,
			create_time:blog.create_time,
			content:blog.content,
			info:blog.info
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
	getList:function(filter,project,cb){
	 	Blog.find(filter,project,{sort:{'_id':-1}},function(err,docs){
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
	removeOne:function(_id,cb){
		Blog.findById(_id,function(err,doc){
			if(err){
				console.log(err)
				return false;
			}
			if(doc){
				doc.remove(function(){
					if(err){
						console.log(err)
						return cb('failed')
					}else {
						console.log('success')
						return cb('success')
					}
				});
			}
		})
	},
	//修改某一篇文章
	modifyOne:function(blog,_id,cb){
		Blog.findByIdAndUpdate(_id,blog,function(err){
			if(err){
				console.log(err)
				return cb('failed')
			}else {
				return cb('success')
			}
		})
	}
}