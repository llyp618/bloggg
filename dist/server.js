(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var compress = __webpack_require__(15);
	var path = __webpack_require__(7);
	var routers = __webpack_require__(12);
	var bodyParser = __webpack_require__(14); //处理请求 json数据的中间件
	var config = __webpack_require__(4);
	var app = express();
	app.use(compress());
	app.use(express.static(path.resolve(__dirname, '../dist'))); //修改静态资源路径
	app.use(bodyParser());
	app.get('/', function (req, res) {
		res.sendFile(path.resolve(__dirname, '../dist/index.html'));
	});

	routers(app);

	var server = app.listen(config.port, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('listening at http://%s:%s', host, port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(20);
	var config = __webpack_require__(4);
	mongoose.Promise = global.Promise;
	mongoose.connect(config.mongodb);

	mongoose.connection.on('connected', function () {
		console.log('Connection success!');
	});
	mongoose.connection.on('error', function (err) {
		console.log('Connection error: ' + err);
	});
	mongoose.connection.on('disconnected', function () {
		console.log('Connection disconnected');
	});
	module.exports = {
		Blog: mongoose.model('Blog', new mongoose.Schema({
			// index:Number,
			title: String,
			classify: String,
			create_time: String,
			content: String,
			info: String,
			pv: Number
		})),
		Classify: mongoose.model('Classify', new mongoose.Schema({
			classify: String,
			article_num: Number
		})),
		Comments: mongoose.model('Comments', new mongoose.Schema({
			title: String,
			comment: {
				create_time: String,
				commenter: String,
				content: String,
				ip: String
			}
		}))
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Blog = __webpack_require__(2).Blog;

	module.exports = {
		// 新建：
		create: function create(blog, cb) {
			var blog = new Blog({
				title: blog.title,
				classify: blog.classify,
				create_time: blog.create_time,
				content: blog.content,
				info: blog.info,
				pv: blog.pv
			});
			blog.save(function (err) {
				//保存文档
				if (err) {
					console.error(err);
					return cb('failed');
				} else {
					return cb('success');
				}
			});
		},
		// 获取列表：
		getList: function getList(currentPage, filter, project, cb) {
			//每页10篇
			Blog.find(filter, project, { sort: { '_id': -1 }, skip: 10 * (currentPage - 1), limit: 10 }, function (err, docs) {
				if (err) {
					console.error(err);
					return false;
				}
				var result = docs;
				//查找总页数
				Blog.find(filter, function (err, docs) {
					if (err) {
						console.error(err);
						return false;
					}
					var totalPages = Math.ceil(docs.length / 10); //总页数返回
					return cb(result, totalPages);
				});
			});
		},
		//获取某一篇文章
		getOne: function getOne(_id, cb) {
			Blog.findById(_id, function (err, doc) {
				if (err) {
					console.error(err);
					return false;
				}
				return cb(doc);
			});
		},
		updatePv: function updatePv(_id) {
			Blog.findById(_id, function (err, doc) {
				if (err) {
					console.error(err);
					return false;
				}
				if (!doc.pv) doc.pv = 0;
				doc.pv = doc.pv + 1;
				doc.save(function (err) {
					if (err) {
						console.error(err);
						return false;
					}
				});
			});
		},
		//删除某一篇文章
		removeOne: function removeOne(_id, cb) {
			Blog.findById(_id, function (err, doc) {
				if (err) {
					console.error(err);
					return false;
				}
				if (doc) {
					var clfy = doc.classify;
					var title = doc.title;
					doc.remove(function () {
						if (err) {
							console.error(err);
							return cb('failed', clfy, title);
						} else {
							return cb('success', clfy, title);
						}
					});
				}
			});
		},
		//修改某一篇文章
		modifyOne: function modifyOne(blog, _id, cb) {
			Blog.findByIdAndUpdate(_id, blog, function (err) {
				if (err) {
					console.error(err);
					return cb('failed');
				} else {
					return cb('success');
				}
			});
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("config-lite");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Comments = __webpack_require__(2).Comments;

	module.exports = {
		create: function create(comment, cb) {
			new Comments(comment).save(cb);
		},
		delete: function _delete(_id, cb) {
			Comments.find({}).deleteOne({ _id: _id }).exec(cb);
		},
		deleteAll: function deleteAll(title) {
			Comments.find({}).deleteMany({ title: title }).exec();
		},
		getlist: function getlist(title, cb) {
			Comments.where('title', title).exec(cb);
		},
		space_getlist: function space_getlist(title, currentPage, cb) {
			Comments.where('title', title).sort({ '_id': -1 }).skip(20 * (currentPage - 1)).limit(20).exec(cb);
		},
		space_getlistcount: function space_getlistcount(title, cb) {
			Comments.where('title', title).count(cb);
		},
		get_titles: function get_titles(cb) {
			Comments.find({}).exec(cb);
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Classify = __webpack_require__(2).Classify;
	var Blog = __webpack_require__(2).Blog;

	module.exports = {
		update: function update(clfy) {
			Classify.find({ classify: clfy }, function (err, DOCS) {
				if (err) {
					console.error(err);
					return false;
				}
				if (DOCS.length === 0) {
					//新增
					var classify = new Classify({
						classify: clfy,
						article_num: 1
					});
					classify.save(function (err) {
						if (err) {
							console.error(err);
						}
					});
				} else {
					Blog.find({ classify: clfy }, function (berr, bdocs) {
						if (berr) {
							console.error(berr);
							return false;
						}
						if (bdocs.length === 0) {
							//=0表明已删除所有类目下文章
							DOCS[0].remove();
						} else {
							DOCS[0].article_num = bdocs.length; //更新文章数目
							DOCS[0].save();
						}
					});
				}
				return;
			});
		},
		getList: function getList(cb) {
			Classify.find({}, ['-_id', '-__v'], function (err, docs) {
				if (err) {
					console.error(err);
					cb('failed', docs);
					return false;
				}
				cb('success', docs);
			});
		},
		modify: function modify(ary, cb) {
			Classify.find({}, function (err, docs) {
				ary.map(function (v, i) {
					docs[i].classify = v;
					docs[i].save(function (err) {
						if (err) {
							console.error(err);
							cb('failed'); //这里有一个异步循环的问题 暂时放一下。。用async可以解决
						}
					});
				});
				cb('succeed');
			});
		}
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var fs = __webpack_require__(16);
	var path = __webpack_require__(7);
	var marked = __webpack_require__(19);
	var highlightJs = __webpack_require__(17);
	var blogModel = __webpack_require__(3);
	var commentModel = __webpack_require__(5);
	var moment = __webpack_require__(6);
	marked.setOptions({
	  renderer: new marked.Renderer(),
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  smartLists: true,
	  smartypants: false,
	  highlight: function highlight(code) {
	    return highlightJs.highlightAuto(code).value;
	  }
	});

	// router.post('/',function(req,res,next){
	// 	var id = req.body.id,
	// 			type = req.body.type
	// 	fs.readFile(path.resolve(__dirname,'../data/'+type+'List/'+id+'.md'),'utf-8',function(err,data){
	// 		if(err){
	// 			throw err
	// 		}
	// 		res.json({
	// 			article:marked(data)   //data是字符串 需要转json对象
	// 		})
	// 	})
	// })

	//暂未区分daily
	router.post('/', function (req, res, next) {
	  var _id = req.body.id;
	  // 增加pv
	  blogModel.updatePv(_id);
	  blogModel.getOne(_id, function (doc) {
	    doc.content = marked(doc.content);
	    res.json({
	      blog: doc
	    });
	  });
	});

	/* 提取评论列表 */
	router.post('/getComments', function (req, res, next) {
	  var title = req.body.title;
	  commentModel.getlist(title, function (err, docs) {
	    if (err) {
	      console.error(err);
	    }
	    var comments = [];
	    docs.map(function (v, i) {
	      comments.push(v.comment);
	    });
	    res.json({
	      comments: comments
	    });
	  });
	});

	/* 增加评论 */
	router.post('/createComment', function (req, res, next) {
	  var title = req.body.title,
	      commenter = req.body.commenter,
	      content = req.body.content,
	      create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
	      ip = req.connection.remoteAddress;
	  var comment = {
	    title: title,
	    comment: {
	      commenter: commenter,
	      content: content,
	      create_time: create_time,
	      ip: ip
	    }
	  };
	  commentModel.create(comment, function (err, doc) {
	    if (err) {
	      console.error(err);
	      res.json({
	        status: 'failed'
	      });
	    } else {
	      res.json({
	        status: 'succeed',
	        comment: doc.comment
	      });
	    }
	  });
	});

	module.exports = router;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var blogModel = __webpack_require__(3);

	router.post('/', function (req, res, next) {
		var currentPage = req.body.currentPage;
		var classify = req.body.classify;
		var filter = { $nor: [{ classify: 'Daily' }] };
		if (classify != 'all') {
			filter = { classify: classify };
		}
		blogModel.getList(currentPage, filter, ['-__v', '-content'], function (result, totalPages) {
			res.json({
				blogs: result,
				totalPages: totalPages
			});
		});
	});

	module.exports = router;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var blogModel = __webpack_require__(3);

	router.post('/', function (req, res, next) {
		var currentPage = req.body.currentPage;
		var classify = req.body.classify;
		var filter = { classify: 'Daily' };
		blogModel.getList(currentPage, filter, ['-__v', '-content'], function (result, totalPages) {
			res.json({
				blogs: result,
				totalPages: totalPages
			});
		});
	});

	module.exports = router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {
		app.use('/api/bloglist', __webpack_require__(10));
		app.use('/api/dailylist', __webpack_require__(11));
		app.use('/api/article', __webpack_require__(9));
		app.use('/api/space', __webpack_require__(13));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var blogModel = __webpack_require__(3);
	var config = __webpack_require__(4);
	var classifyModel = __webpack_require__(8);
	var commentModel = __webpack_require__(5);
	var moment = __webpack_require__(6);
	var router = express.Router();
	var sha1 = __webpack_require__(21);
	var jwt = __webpack_require__(18);
	// token 验证
	router.post('/space_auth', function (req, res, next) {
		// res.set('Access-Control-Expose-Headers', 'access-token')
		var unAuth = true;
		var token = req.headers['access-token'];
		jwt.verify(token, config.token.secret, function (err, decoded) {
			if (err) {
				// res.sendStatus('401')
				res.json({
					status: 0
				});
			} else {
				// res.sendStatus(200)
				res.json({
					status: 1
				});
			}
		});
	});
	//登录
	router.post('/space_login', function (req, res, next) {
		var account = req.body.account;
		var password = req.body.password;
		if (sha1(account) != config.account || sha1(password) != config.password) {
			res.json({
				status: 0,
				msg: '账号或密码错误!'
			});
		} else {
			var token = jwt.sign({ key: config.token.key }, config.token.secret, { expiresIn: config.token.expireTime });
			res.json({
				status: 1,
				msg: '登录成功!',
				access_token: token
			});
		}
	});
	// 新建博客文章(修改)
	router.post('/blog_create_modify', function (req, res, next) {
		var title = req.body.title,
		    classify = req.body.classify,
		    content = req.body.content,
		    _id = req.body._id,
		    info = req.body.info,
		    create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
		    oldClassify = req.body.oldClassify;
		var blog = {
			title: title,
			classify: classify,
			content: content,
			info: info
		};
		//如果_id不为空 则修改 
		if (_id != '' && _id.length != 0) {
			blogModel.modifyOne(blog, _id, function (status) {
				if (status == 'failed') {
					res.json({
						status: 0
					});
				} else if (status == 'success') {
					classifyModel.update(classify); //添加文章类型表
					if (oldClassify != classify && oldClassify != '') {
						classifyModel.update(oldClassify);
					}
					res.json({
						status: 1
					});
				}
			});
			return false;
		}
		//新建文章 增加个pv数 和 创建时间
		blog.pv = 0;
		blog.create_time = create_time;
		blogModel.create(blog, function (status) {
			if (status == 'failed') {
				res.json({
					status: 0
				});
			} else if (status == 'success') {
				classifyModel.update(classify);
				res.json({
					status: 1
				});
			}
		});
	});

	router.post('/blog_getOne', function (req, res, next) {
		var _id = req.body._id;
		blogModel.getOne(_id, function (doc) {
			res.json({
				blog: doc
			});
		});
	});

	//获取文章列表
	router.post('/bloglist', function (req, res, next) {
		var currentPage = req.body.currentPage;
		var classify = req.body.classify;
		var filter = {};
		if (classify != 'all') {
			filter = { classify: classify };
		}
		blogModel.getList(currentPage, filter, ['-__v', '-content'], function (result, totalPages) {
			res.json({
				blogs: result,
				totalPages: totalPages
			});
		});
	});

	// //添加了分页的文章列表
	// router.post('/bloglist_page',function(req,res,next){
	// 	blogModel.getListPage(currentPage,{},['-__v','-content'],function(docs){
	// 		res.json({
	// 			blogs:docs
	// 		})
	// 	})
	// })


	// 删除文章
	router.post('/blog_delete', function (req, res, next) {
		var _id = req.body._id;
		blogModel.removeOne(_id, function (status, clfy, title) {
			if (status == 'failed') {
				res.json({
					status: 0
				});
			} else if (status == 'success') {
				classifyModel.update(clfy);
				commentModel.deleteAll(title); //删除该文章下所有的评论
				res.json({
					status: 1
				});
			}
		});
	});
	// 获取分类
	router.get('/blog_classify_list', function (req, res, next) {
		classifyModel.getList(function (status, docs) {
			if (status == 'failed') {
				res.json({
					classifyList: []
				});
				return false;
			}
			var list = docs.map(function (v, i) {
				return { classify: v.classify, article_num: v.article_num };
			});
			res.json({
				classifyList: list
			});
		});
	});
	router.post('/blog_classify_modify', function (req, res, next) {
		var classifyList = req.body.classifyList;
		classifyModel.modify(classifyList, function (status) {
			if (status == 'failed') {
				res.json({
					status: 0
				});
			} else {
				res.json({
					status: 1
				});
			}
		});
	});
	// 获取评论
	router.post('/get_comments', function (req, res, next) {
		var title = req.body.title;
		var currentPage = req.body.currentPage;
		if (title == 'all') {
			title = /.*/ig;
		}
		commentModel.space_getlist(title, currentPage, function (err, docs) {
			if (err) {
				console.error(err);
			}
			commentModel.space_getlistcount(title, function (err, count) {
				res.json({
					comments: docs,
					totalPages: Math.ceil(count / 20)
				});
			});
		});
	});
	// 删除评论
	router.post('/delete_comment', function (req, res, next) {
		var _id = req.body._id;
		commentModel.delete(_id, function (err) {
			if (err) {
				console.error(err);
				res.json({
					status: 'failed'
				});
			} else {
				res.json({
					status: 'succeed'
				});
			}
		});
	});

	//获取所有文章标题
	router.get('/get_titles', function (req, res, next) {
		commentModel.get_titles(function (err, docs) {
			if (err) console.error(err);
			var titles = [],
			    titleJson = {};
			docs.map(function (v, i) {
				if (!titleJson[v.title]) {
					titles.push(v.title);
					titleJson[v.title] = 1;
				}
			});
			res.json({
				titleSources: titles
			});
		});
	});

	module.exports = router;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("highlight.js");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("marked");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("sha1");

/***/ }
/******/ ])));