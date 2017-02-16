var express = require('express')
var router = express.Router();

router.get('/',function(req,res,next){
	res.json({
		blogList : [
			{
				title : 'lulu',
				subtitle : '17.2.16',
				text : '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
				id : '1'
			},
			{
				title : 'lulu2',
				subtitle : '17.2.17',
				text : '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
				id : '2'
			},

			{
				title : 'lulu2',
				subtitle : '17.2.17',
				text : '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本',
				id : '3'
			}
		]
	})
})

module.exports = router;