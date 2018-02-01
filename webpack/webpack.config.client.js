const path = require("path");
const webpack = require("webpack");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMerge = require("webpack-merge");

const {
	SOURCE_ROOT,
	GLOBAL_STYLE_FILE,
	CLIENT_ENTRY_FILE,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH,
} = require("./paths");
const commonConfig = require("./webpack.config.common");

const clientConfig = {
	entry: {
		"app-client": [
			GLOBAL_STYLE_FILE,
			CLIENT_ENTRY_FILE
		]
	},
	output: {
		filename: "[name].js",
		path: CLIENT_OUTPUT_PATH,
		publicPath: PUBLIC_PATH,
		library: ["IRA", "[name]"],
		libraryTarget: "umd",
	},
	plugins: [],
	devServer: {
		contentBase: CLIENT_OUTPUT_PATH,
		watchContentBase: true,
		watchOptions: {},
		publicPath: PUBLIC_PATH,
		port: 8081,
		proxy: {
			'**': 'http://[::1]:8080',
			secure: false,
			changeOrigin: true,
		},
	}
}

module.exports = webpackMerge(clientConfig, commonConfig);
