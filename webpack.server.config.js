var webpack = require('webpack');
var path = require('path');
module.exports = {
	entry:'./server/app.js',
	output:{
		path:'./dist',
		filename:'server.js',
		libraryTarget:'commonjs'
	},
	target:'node',
	node:{
		__filename:true,
		__dirname:true
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
	externals:[{
		'mongoose':'mongoose',
		'express':'express',
		'config-lite':'config-lite'
	}
	],
	plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     comments: false
        // }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
	]
}