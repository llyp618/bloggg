var webpack = require('webpack'); 
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');  //用来生成html
module.exports = {
	entry:{
		js:'./src/app.js',
		vendor:['react','react-router','react-dom']
	},
	output:{
		path:'./dist',
		filename:'bundle.js'
	},
	devServer:{                //webpack-dev-server 需要安装
		contentBase:'./dist',
		port:6767,
		inline:true,
		colors:true
	},
	postcss:[autoprefixer],
	module:{
		loaders:[
			{
				test:/\.js[x]?$/,
				exclude:/node_modules/,
				loader:'babel'
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.less$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader!postcss!less-loader'   //webpack使用其他工具时一定要同时装*-loader，否则出现奇怪的错误
			},
			{
				test:/\.(png|jpg|svg|gif)$/,
				exclude:/node_modules/,
				loader:'url-loader?limit=1000000'
			}
		]
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'dist/index.html')    //html-webpack-plugin 插件取相应的模板去插入，
		})
	]
};