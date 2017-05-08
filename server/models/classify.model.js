var Classify = require('../db/mongoose').Classify
var Blog = require('../db/mongoose').Blog

module.exports = {
	update:function(clfy){
		Classify.find({classify:clfy},function(err,docs){
			if(err){
				console.error(err)
				return false
			}
			if(docs.length === 0){
				var classify = new Classify({
					classify:clfy,
					article_num:1
				})
				classify.save(function(err){
					if(err){
						console.error(err)
					}
				})
			}else {
				Blog.find({classify:clfy},function(berr,bdocs){
					if(berr){
						console.error(berr)
						return false
					}
					docs[0].article_num = bdocs.length
					docs[0].save()
				})
			}
			return 
		})
	},
	delete:function(clfy){
		Blog.find({classify:clfy},function(err,docs){
			if(err){
				console.error(err)
				return false;
			}
			if(docs.length === 0){
				Classify.findOne({classify:clfy},function(err,doc){
					if(err){
						console.error(err)
						return false
					}
					if(doc){
						doc.remove()
					}
				})
			}
			return
		})
	},
	getList:function(cb){
		Classify.find({},['-_id','-__v'],function(err,docs){
			if(err){
				console.error(err)
				cb('failed',docs)
				return false
			}
			cb('success',docs)
		})
	},
	modify:function(ary,cb){
		Classify.find({},function(err,docs){
			ary.map(function(v,i){
				docs[i].classify = v;
				docs[i].save(function(err){
					if(err){
						console.error(err)
						cb('failed')  //这里有一个异步循环的问题 暂时放一下。。用async可以解决
					}
				});
			});
			cb('succeed')
		})
	}
}