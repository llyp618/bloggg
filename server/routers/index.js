module.exports = function(app){
	app.use('/api/bloglist',require('./bloglist'))
	app.use('/api/article',require('./article'))
}