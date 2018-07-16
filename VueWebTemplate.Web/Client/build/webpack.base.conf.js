'use strict';

const config = require('./config');
const vueLoaderConfig = require('./vue-loader.conf');
const utils = require('./utils');

// eslint loader配置
const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [utils.join('src'), utils.join('test')],
	options: {
		emitWarning: true
	}
});

module.exports = {
	entry: {
		app: utils.join('src/index.js')
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': utils.join('src')
		}
	},
	module: {
		rules: [
			...(config.useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue?$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					utils.join('src'),
					utils.join('test'),
					/node_modules(\\|\/)mpit-utils/ // mpit-utils也需要使用babel转码
				]
			},
			{
				test: /\.css$/,
				use: vueLoaderConfig.loaders.css
			},
			{
				test: /\.scss$/,
				use: vueLoaderConfig.loaders.sass,
				include: utils.join('src')
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('img/[name].[ext]?v=[hash:7]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('medias/[name].[ext]?v=[hash:7]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('fonts/[name].[ext]?v=[hash:7]')
				}
			}
		]
	}
};