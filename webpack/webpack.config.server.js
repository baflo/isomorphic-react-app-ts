const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");
const WebpackStartServerPlugin = require("start-server-webpack-plugin");

const {
	GLOBAL_STYLE_FILE,
	SERVER_ENTRY_FILE,
	CLIENT_OUTPUT_PATH,
	SERVER_OUTPUT_PATH,
	PUBLIC_PATH,
	PUBLIC_STYLE_FILE,
} = require("./paths");
const commonConfig = require("./webpack.config.common");

const serverConfig = {
	watch: true,
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	entry: {
		"api-server": [
			"webpack/hot/poll?1000",
			GLOBAL_STYLE_FILE,
			SERVER_ENTRY_FILE
		],
	},
	output: {
		filename: "[name].js",
		path: SERVER_OUTPUT_PATH,
		publicPath: PUBLIC_PATH,
		libraryTarget: "umd",
	},
	plugins: [
		new webpack.DefinePlugin({
			"GLOBAL_ASSETS_PATH":
				JSON.stringify(CLIENT_OUTPUT_PATH),
			"GLOBAL_SSR_ENABLED":
				JSON.stringify(process.env.NODE_ENV !== "development"),
		}),
		// new WebpackExtractTextPlugin({
		// 	filename: `${"C:\Users\fbachmann\Documents\workspace_web\isomorphic-react-app-ts\bundles\client\styles.css"}`,
		// 	allChunks: true,
		// }),
		new webpack.HotModuleReplacementPlugin({ quiet: true }),
		new WebpackStartServerPlugin({
			name: "api-server.js",
			// nodeArgs: ['--inspect'], // allow debugging		
		}),
	],
	externals: [
		webpackNodeExternals({
			whitelist: [
				'webpack/hot/poll?1000',
				/^purecss/,
			]
		}),
	],
};

module.exports = webpackMerge(commonConfig, serverConfig);
