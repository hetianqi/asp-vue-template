'use strict';

const utils = require('./utils');

module.exports = {
	useEslint: false, // 使用eslint校验

	// 开发环境配置，该模式下可实现热更新等功能
	dev: {
		publicPath: '/',
		port: 59102, // webpack-dev-server启动端口		

		devtool: 'cheap-module-eval-source-map',
		
		// 页面相关的变量
		rootUrl: '/',
		apiUrl: 'http://localhost:59101/Api/',
		selectorUrl: 'http://eip.mpdev.com:4000/Selector-v2/',
		caUrl: '',
		rightManageUrl: 'http://eip.mpdev.com/RightManage/',
		rightApplicationId: 'xxxx'
	},
	// 传统的开发环境配置
	start: {
		path: utils.join('../Static'),
		publicPath: '/Static/',
		
		devtool: 'source-map',

		// 页面相关的变量
		rootUrl: '/',
		apiUrl: '/Api/',
		selectorUrl: '@System.Configuration.ConfigurationManager.AppSettings["SelectorUrl"]',
		caUrl: '@System.Configuration.ConfigurationManager.AppSettings["CAUrl"]',
		rightManageUrl: '@System.Configuration.ConfigurationManager.AppSettings["RightManageUrl"]',
		rightApplicationId: '@System.Configuration.ConfigurationManager.AppSettings["RightApplicationId"]'
	},
	// 生产环境配置
	build: {
		path: utils.join('../Static'),
		publicPath: '/VueWebTemplate/Static/',
		
		devtool: 'source-map',

		// 页面相关的变量
		rootUrl: '/VueWebTemplate/',
		apiUrl: '/VueWebTemplate/Api/',
		selectorUrl: '@System.Configuration.ConfigurationManager.AppSettings["SelectorUrl"]',
		caUrl: '@System.Configuration.ConfigurationManager.AppSettings["CAUrl"]',
		rightManageUrl: '@System.Configuration.ConfigurationManager.AppSettings["RightManageUrl"]',
		rightApplicationId: '@System.Configuration.ConfigurationManager.AppSettings["RightApplicationId"]'
	}
};