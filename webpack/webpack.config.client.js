const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

const {
	SOURCE_ROOT_PATH,
	REACT_LOADABLE_STATS_PATH,
	GLOBAL_STYLE_FILE,
	APP_INDEX_FILE,
	CLIENT_ENTRY_FILE,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH, } = require("./paths");

const { typescriptRegEx } = require("./regex");

const { globalStylesLoader, localStylesLoader } = require("./webpack-style-loader");
const commonConfig = require("./webpack.config.common");

const clientConfig = {
	entry: {
		"app-client": [
			"babel-polyfill",
			GLOBAL_STYLE_FILE,
			CLIENT_ENTRY_FILE
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
			name: "vendor",
			minChunks: Infinity,
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
	},
	module: {
		rules: [
			globalStylesLoader(),
			localStylesLoader(),
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: typescriptRegEx,
				include: SOURCE_ROOT_PATH,
				use: [{
					loader: "awesome-typescript-loader",
					options: {
						useBabel: true,
						babelOptions: {
							babelrc: false,
							presets: [
								"react",
								[
									"env",
									{
										modules: false,
										targets: {
											browsers: "last 2 chrome versions"
										}
									}
								]
							],
							plugins: [
								"react-hot-loader/babel",
								"react-loadable/babel",
								"syntax-dynamic-import",
							]
						}
					}
				}]
			},
		]
	}
}

module.exports = webpackMerge(clientConfig, commonConfig)
