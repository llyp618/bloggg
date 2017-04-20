var Comments = require('../db/mongoose').Comments

module.exports = {
	create:function(comment,cb){
		new Comments(comment).save(cb)
	},
	delete:function(){

	},
	getlist:function(title,cb){
		Comments.where('title',title).exec(cb)
	},
	space_getlist:function(title,currentPage,cb){

		Comments.where('title',title).sort({'_id':-1}).skip(20 * (currentPage - 1)).limit(20).exec(cb)
	}
}