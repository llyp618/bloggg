var Classify = require('../db/mongoose').Classify
var Blog = require('../db/mongoose').Blog

module.exports = {
	add:function(clfy){
		Classify.find({classify:clfy},function(err,docs){
			if(err){
				console.log('err:',err)
				return false
			}
			if(docs.length === 0){
				var classify = new Classify({
					classify:clfy
				})
				classify.save(function(err){
					if(err){
						console.log(err)
					}
				})
			}
			return 
		})
	},
	delete:function(clfy){
		Blog.find({classify:clfy},function(err,docs){
			if(err){
				console.log('err:',err)
				return false;
			}
			if(docs.length === 0){
				Classify.findOne({classify:clfy},function(err,doc){
					if(err){
						console.error('err:',err)
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
				console.log('err:',err)
				cb('failed',docs)
				return false
			}
			cb('success',docs)
		})
	}
}