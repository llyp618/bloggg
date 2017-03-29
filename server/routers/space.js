var express = require('express')
var router = express.Router()
var SECRET = 'secret';
router.post('/space_auth',function(req,res,next){
	res.set('Access-Control-Expose-Headers', 'access-token')
	var unAuth = true;
	var token = req.headers['access-token']
	if(token == SECRET) {
		unAuth = false;

	}
	if(unAuth){
		res.sendStatus(401)
	} else {
		res.sendStatus(200)
	}
})

router.post('/space_login',function(req,res,next){
	res.set('Access-Control-Expose-Headers','access-token')
	var account = req.body.account;
	var password = req.body.password;
	if(account != '1' || password != '1') {
		res.json({
			status:0,
			msg:'账号或密码错误!'
		});
	}else {
		res.set('access-token',SECRET)
		res.json({
			status:1,
			msg:'登录成功!'
		});
	}
})

module.exports = router