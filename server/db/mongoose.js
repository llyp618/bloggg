var mongoose = require('mongoose')
var config = require('config-lite')
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb)

mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});
module.exports = {
	Blog:mongoose.model('Blog',new mongoose.Schema({
		// index:Number,
		title:String,
		classify:String,
		create_time:String,
		content:String,
		info:String
	}))
}