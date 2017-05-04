var webpack = require('webpack'); 
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');  //用来生成html
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry:{
		js:'./src/app.js',
		vendor:['react','react-router','react-dom','whatwg-fetch','material-ui']
	},
	output:{
		path:'./dist',
		filename:'bundle.js',
		chunkFilename:'[name].[chunkhash:5].chunk.js'
	},
	devServer:{                //webpack-dev-server 需要安装
		contentBase:'./dist',
		port:6767,
		inline:true,
		colors:true,
		proxy:{            //代理请求，后端开发接口
			'/api':{
				target:'http://localhost:3000',
				secure:false
			}
		}
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
				loader:ExtractTextPlugin.extract('style-loader','css-loader')
			},
			{
				test:/\.less$/,
				exclude:/node_modules/,
				loader:ExtractTextPlugin.extract('style-loader','css-loader!less-loader')   //webpack使用其他工具时一定要同时装*-loader，否则出现奇怪的错误
			},
			{
				test:/\.(png|jpg|svg|gif)$/,
				exclude:/node_modules/,
				loader:'url-loader?limit=1000000'
			}
		]
	},
	plugins:[
		new webpack.DefinePlugin({
           "process.env": { 
				     NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") 
				   }
        }),
		new webpack.optimize.OccurrenceOrderPlugin(), //排序
		new webpack.optimize.DedupePlugin(), //模块去重
		new ExtractTextPlugin("styles.css"), //css单独打包
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'dist/index.html')    //html-webpack-plugin 插件取相应的模板去插入，
		})
	]
};