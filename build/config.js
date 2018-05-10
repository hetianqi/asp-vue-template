'use strict';

module.exports = {
	dev: {
		publicPath: '/', // 静态资源引入路径
		port: 8080, // webpack-dev-server启动端口
		
		useEslint: true, // 使用eslint校验

		devtool: 'cheap-module-eval-source-map' // source-map生成方式，该方式适合开发环境
	},
	build: {
		publicPath: '/', // 静态资源引入路径
		
		devtool: 'source-map' // source-map生成方式，该方式适合生产环境
	}
};