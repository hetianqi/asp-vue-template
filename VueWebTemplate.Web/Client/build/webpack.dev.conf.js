'use strict';

const webpack = require('webpack');
const config = require('./config');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
	output: {
		publicPath: config.dev.publicPath,
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].js'
	},
	devtool: config.dev.devtool,
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
		open: true,
		contentBase: false,
		compress: true,
		host: '0.0.0.0',
		port: config.dev.port,
		public: 'localhost:' + config.dev.port,
		overlay: { warnings: false, errors: true },
		publicPath: config.dev.publicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: utils.join('src/index.cshtml'),
			inject: true,
			hash: true,
			
			rootUrl: config.dev.rootUrl,
			apiUrl: config.dev.apiUrl,
			selectorUrl: config.dev.selectorUrl,
			caUrl: config.dev.caUrl,
			rightManageUrl: config.dev.rightManageUrl,
			rightApplicationId: config.dev.rightApplicationId
		}),
		// 拆分vendor，所有从node_modules中引入的都加入vendor
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks (module) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(utils.join('node_modules')) === 0
				);
			}
		}),
		// 将manifest提取出来，可以让vendor保持不变
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		// 复制静态资源static目录
		new CopyWebpackPlugin([
			{
				from: utils.join('static'),
				to: ''
			}
		])
	]
});