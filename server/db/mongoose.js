var mongoose = require('mongoose')
var config = require('config-lite')
mongoose.connect(config.mongodb)

module.exports = {
	BlogList:mongoose.model('BlogList',new mongoose.Schema({
		index:Number,
		title:String,
		classify:String,
		create_time:String,
		content:String,
	}))
}