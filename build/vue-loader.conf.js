'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

function generateLoader(loader) {
	const loaders = [
		{
			loader: 'css-loader',
			options: {
				sourceMap: true
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true
			}
		}
	];

	if (loader) {
		loaders.push({
			loader: loader + '-loader',
			options: {
				sourceMap: true
			}
		});
	}
	if (isProduction) {
		return ExtractTextPlugin.extract({
			use: loaders,
			fallback: 'vue-style-loader'
		});
	} else {
		return ['vue-style-loader'].concat(loaders);
	}
}

module.exports = {
	loaders: {
		css: generateLoader(),
		less: generateLoader('less')
	},
	cssSourceMap: true
};