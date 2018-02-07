const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackIgnoreEmitPlugin = require("ignore-emit-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

const {
	SOURCE_ROOT_PATH,
	GLOBAL_STYLE_FILE,
	SERVER_ENTRY_FILE,
	SERVER_OUTPUT_PATH,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH,
	REACT_LOADABLE_STATS_PATH, } = require("./paths");

const {
	typescriptRegEx,
	cssRegEx,
	urlLoaderRegEx,
	responsiveLoaderRegEx } = require("./regex");

const { globalStylesLoader, localStylesLoader } = require("./webpack-style-loader");
const commonConfig = require("./webpack.config.common");

// Whether or not server shall do rendering (not recommended for development)
const GLOBAL_SSR_ENABLED = process.env.SSR || process.env.NODE_ENV !== "development";

// Create target dir
fs.ensureDirSync(SERVER_OUTPUT_PATH);

const serverConfig = {
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
		chunkFilename: "[name].server.js",
		filename: "[name].js",
		libraryTarget: "umd",
		path: SERVER_OUTPUT_PATH,
		publicPath: PUBLIC_PATH,
	},
	externals: [
		webpackNodeExternals({
			whitelist: [
				"webpack/hot/poll?1000",
				/^purecss/,
			]
		}),
	],
	plugins: [
		new webpack.DefinePlugin({
			"REACT_LOADABLE_STATS_PATH":
				JSON.stringify(path.relative(SERVER_OUTPUT_PATH, REACT_LOADABLE_STATS_PATH)),
			"PUBLIC_PATH":
				JSON.stringify(PUBLIC_PATH),
			"GLOBAL_SSR_ENABLED":
				JSON.stringify(GLOBAL_SSR_ENABLED),
			"GLOBAL_ASSETS_PATH":
				JSON.stringify(path.relative(SERVER_OUTPUT_PATH, CLIENT_OUTPUT_PATH)),
		}),
		new WebpackExtractTextPlugin(
			path.relative(SERVER_OUTPUT_PATH, path.join(CLIENT_OUTPUT_PATH, "styles.css")),
			{
				allChunks: true,
			}
		),
		new WebpackShellPlugin({
			onBuildEnd: ['npm run server']
		}),
	],
	module: {
		rules: [
			globalStylesLoader(WebpackExtractTextPlugin),
			localStylesLoader(WebpackExtractTextPlugin),
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
							"presets": [
								"react",
								[
									"env",
									{
										"modules": false,
										"targets": {
											"node": "6"
										}
									}
								]
							],
							"plugins": [
								"react-hot-loader/babel",
								"react-loadable/babel",
								"dynamic-import-node",
							]
						}
					}
				}]
			},
		]
	}
};

module.exports = webpackMerge(commonConfig, serverConfig);
