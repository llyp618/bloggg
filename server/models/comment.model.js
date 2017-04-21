var Comments = require('../db/mongoose').Comments

module.exports = {
	create:function(comment,cb){
		new Comments(comment).save(cb)
	},
	delete:function(_id,cb){
		Comments.find({}).deleteOne({_id:_id}).exec(cb)
	},
	getlist:function(title,cb){
		Comments.where('title',title).exec(cb)
	},
	space_getlist:function(title,currentPage,cb){
		Comments.where('title',title).sort({'_id':-1}).skip(20 * (currentPage - 1)).limit(20).exec(cb)
	},
	space_getlistcount:function(title,cb){
		Comments.where('title',title).count(cb)
	},
	get_titles:function(cb){
		Comments.find({}).exec(cb)
	}
}