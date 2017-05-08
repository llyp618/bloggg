var Classify = require('../db/mongoose').Classify
var Blog = require('../db/mongoose').Blog

module.exports = {
	update:function(clfy){
		Classify.find({classify:clfy},function(err,DOCS){
			if(err){
				console.error(err)
				return false
			}
			if(DOCS.length === 0){   //新增
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
					if(bdocs.length === 0){    //=0表明已删除所有类目下文章
						DOCS[0].remove()
					}else{
						DOCS[0].article_num = bdocs.length      //更新文章数目
						DOCS[0].save()
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