const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");
const WebpackStartServerPlugin = require("start-server-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

const {
	GLOBAL_STYLE_FILE,
	APP_ROOT_FILE,
	SERVER_ENTRY_FILE,
	SERVER_OUTPUT_PATH,
	PUBLIC_PATH,
	PUBLIC_STYLE_FILE,
	REACT_LOADABLE_STATS_PATH,
} = require("./paths");
const commonConfig = require("./webpack.config.common");

const serverConfig = {
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	entry: {
		"api-server": [
			"webpack/hot/poll?1000",
			"babel-polyfill",
			"react-hot-loader/patch",
			GLOBAL_STYLE_FILE,
			SERVER_ENTRY_FILE
		],
		"app-root": [
			"webpack/hot/poll?1000",
			"babel-polyfill",
			"react-hot-loader/patch",
			GLOBAL_STYLE_FILE,
			APP_ROOT_FILE
		],
	},
	output: {
		filename: "[name].js",
		chunkFilename: "[name].bundle.js",
		path: SERVER_OUTPUT_PATH,
		publicPath: PUBLIC_PATH,
		libraryTarget: "umd",
	},
	plugins: [
		new ReactLoadablePlugin({
			filename: path.join(REACT_LOADABLE_STATS_PATH),
		}),
		new webpack.DefinePlugin({
			"PUBLIC_PATH":
				JSON.stringify(PUBLIC_PATH),
			"REACT_LOADABLE_STATS_PATH":
				JSON.stringify(REACT_LOADABLE_STATS_PATH),
			"GLOBAL_SSR_ENABLED":
				JSON.stringify(process.env.NODE_ENV !== "development"),
		}),
		new webpack.HotModuleReplacementPlugin({ quiet: true }),
		new WebpackStartServerPlugin({
			name: "api-server.js",
			// nodeArgs: ["--inspect"], // allow debugging
		}),
	],
	externals: [
		webpackNodeExternals({
			whitelist: [
				"webpack/hot/poll?1000",
				/^purecss/,
			]
		}),
	],
};

module.exports = webpackMerge(commonConfig, serverConfig);
