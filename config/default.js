module.exports = {
	port:3000,
	basePath:'/',
	token:{
		secret:'myblog',
		key:'myblog',
		maxAge:86400000 //一天
	},
	mongodb:'mongodb://localhost:27017/llll'
}