const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

const {
	REACT_LOADABLE_STATS_PATH,
	GLOBAL_STYLE_FILE,
	APP_INDEX_FILE,
	CLIENT_ENTRY_FILE,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH, } = require("./paths");

const commonConfig = require("./webpack.config.common");

const clientConfig = {
	entry: {
		"app-client": [
			"babel-polyfill",
			GLOBAL_STYLE_FILE,
			CLIENT_ENTRY_FILE
		],
		"app-root": [
			"babel-polyfill",
			GLOBAL_STYLE_FILE,
			APP_INDEX_FILE
		],
	},
	output: {
		filename: "[name].js",
		chunkFilename: "[name].client.js",
		path: CLIENT_OUTPUT_PATH,
		publicPath: PUBLIC_PATH,
		library: ["IRA", "[name]"],
		libraryTarget: "umd",
	},
	plugins: [
		new ReactLoadablePlugin({
			filename: REACT_LOADABLE_STATS_PATH,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			minChunks: Infinity
		}),
	],
	devServer: {
		hot: true,
		// inline: true,
		contentBase: CLIENT_OUTPUT_PATH,
		watchContentBase: true,
		watchOptions: {},
		publicPath: PUBLIC_PATH,
		port: 8081,
		proxy: {
			"**": "http://[::1]:8080",
			secure: false,
			changeOrigin: true,
		},
	}
}

module.exports = webpackMerge(clientConfig, commonConfig);
