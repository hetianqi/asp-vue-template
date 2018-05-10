'use strict';

const webpack = require('webpack');
const config = require('./config');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
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
				NODE_ENV: '"development"'
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: utils.join('src/index.html'),
			inject: true
		}),
		// 复制静态资源static目录
		new CopyWebpackPlugin([
			{
				from: utils.join('static'),
				to: utils.join('dist/static')
			}
		])
	]
});