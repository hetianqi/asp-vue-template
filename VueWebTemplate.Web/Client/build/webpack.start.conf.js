'use strict';

const webpack = require('webpack');
const config = require('./config');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const BomPlugin = require('webpack-utf8-bom');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
	output: {		
		path: config.start.path,
		publicPath: config.start.publicPath,
		filename: utils.staticPath('js/[name].js?v=[chunkhash:7]'),
		chunkFilename: utils.staticPath('js/[id].js?v=[chunkhash:7]')
	},
	devtool: config.start.devtool,
	plugins: [
		new CleanWebpackPlugin(['../../Static/*'], {
			allowExternal: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		// 提取css
		new ExtractTextPlugin({
			filename: utils.staticPath('css/[name].css?v=[contenthash:7]'),
			allChunks: true,
		}),
		// css去重
		new OptimizeCSSPlugin({
			cssProcessorOptions: { safe: true, map: { inline: false } }
		}),
		// html模板
		new HtmlWebpackPlugin({
			// 将视图文件单独发布到Views目录下
			filename: '../Views/index.cshtml',
			template: utils.join('src/index.cshtml'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency',
			
			rootUrl: config.start.rootUrl,
			apiUrl: config.start.apiUrl,
			selectorUrl: config.start.selectorUrl,
			caUrl: config.start.caUrl,
			rightManageUrl: config.start.rightManageUrl,
			rightApplicationId: config.start.rightApplicationId
		}),
		// 解决cshtml中文乱码的问题
		new BomPlugin(true, /\.(cshtml)$/),
		// 保持模块id不变
		new webpack.HashedModuleIdsPlugin(),
		// 可以提升打包之后的代码在浏览器中的执行速度
		new webpack.optimize.ModuleConcatenationPlugin(),
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
		// This instance extracts shared chunks from code splitted chunks and bundles them
		// in a separate chunk, similar to the vendor chunk
		// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			async: 'vendor-async',
			children: true,
			minChunks: 3
		}),
		// 复制静态资源static目录
		new CopyWebpackPlugin([
			{
				from: utils.join('static'),
				to: config.build.path
			}
		])
	]
});