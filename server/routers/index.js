module.exports = function(app){
	app.use('/api/bloglist',require('./bloglist'))
	app.use('/api/dailylist',require('./dailylist'))
	app.use('/api/article',require('./article'))
	app.use('/api/space_login',require('./space_login'))
}