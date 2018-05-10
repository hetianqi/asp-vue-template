'use strict';

const config = require('./config');
const vueLoaderConfig = require('./vue-loader.conf');
const utils = require('./utils');
const isProduction = process.env.NODE_ENV === 'production';

// eslint loader配置
const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [utils.join('src'), utils.join('test')],
	options: {
		// formatter: require('eslint-friendly-formatter'),
		emitWarning: true
	}
});

module.exports = {
	entry: {
		app: utils.join('src/entry.js')
	},
	output: {
		path: utils.join('dist'),
		publicPath: isProduction ? config.build.publicPath : config.dev.publicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': utils.join('src')
		}
	},
	devtool: isProduction ? config.build.devtool : config.dev.devtool,
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue?$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [utils.join('src'), utils.join('test')]
			},
			{
				test: /\.css$/,
				use: vueLoaderConfig.loaders.css
			},
			{
				test: /\.less$/,
				use: vueLoaderConfig.loaders.less,
				include: utils.join('src')
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.staticPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
};