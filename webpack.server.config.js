var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
module.exports = {
	entry:'./server/app.js',
	output:{
		path:'./dist',
		filename:'server.js',
		libraryTarget:'commonjs'
	},
	target:'node',     //不打包nodejs原生模块
	node:{
		__filename:false,
		__dirname:false
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel',
				query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['add-module-exports'],
          cacheDirectory: true
				}
			},
			{
        test: /\.css$/,
				exclude:/node_modules/,
        loaders: [
            'css/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
        ]
			},
			{
        test: /\.less$/,
				exclude:/node_modules/,
        loaders: [
            'css/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
            'less'
        ]
			}, {
        test: /\.(jpg|png|gif|webp|svg)$/,
				exclude:/node_modules/,
        loader: 'url?limit=80000'
			},
			{
        test: /\.json$/,
        loader: 'json'
			}


		]
	},
	externals:fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([    //node_modules 中的模块不打包
    'react-dom/server'   
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
	plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
	]
}