var express = require('express')
var router = express.Router()

router.post('/',function(req,res,next){
	var account = req.body.account;
	var password = req.body.password;
	if(account != '1' || password != '1') {
		res.json({
			status:0,
			msg:'账号或密码错误!'
		});
	}else {
		res.json({
			status:1,
			msg:'登录成功!'
		});
	}
})

module.exports = router