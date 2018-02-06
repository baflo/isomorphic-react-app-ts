const path = require("path");
const webpack = require("webpack");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const {
	CONTEXT_PATH,
	SOURCE_ROOT_PATH, } = require("./paths");

const {
	cssTypeRegEx,
	typescriptRegEx,
	responsiveLoaderRegEx,
	urlLoaderRegEx } = require("./regex");

const { globalStylesLoader, localStylesLoader } = require("./webpack-style-loader");

const commonConfig = {
	context: CONTEXT_PATH,
	devtool: "cheap-module-eval-source-map",
	watchOptions: {
		ignored: /node_modules/
	},
	plugins: [
		new webpack.EnvironmentPlugin([
			"NODE_ENV",
			"DEBUG",
		]),
		new webpack.DefinePlugin({
			"CONTEXT_PATH":
				JSON.stringify(CONTEXT_PATH),
			"SOURCE_ROOT_PATH":
				JSON.stringify(SOURCE_ROOT_PATH),
		}),
		new WebpackExtractTextPlugin("./styles.css", {
			allChunks: true,
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin({ quiet: true }),
		new WebpackForkTsCheckerPlugin(),
		new webpack.WatchIgnorePlugin([cssTypeRegEx]),
	],
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".js", ".ts", ".tsx"],
		symlinks: false,
		cacheWithContext: false,
		plugins: [
			new TsConfigPathsPlugin({
				doTypeCheck: false,
				tsconfig: path.join(__dirname, '../tsconfig.json'),
				baseUrl: path.join(
					__dirname, '..',
					require('../tsconfig.json').compilerOptions.baseUrl
				),
			}),
		]
	},
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
						useBabel: true
					}
				}]
			},
			{
				test: urlLoaderRegEx,
				include: SOURCE_ROOT_PATH,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							fallback: "file-loader",
							name: "[path]___[name].[ext]",
						}
					}
				]
			},
			{
				test: responsiveLoaderRegEx,
				include: SOURCE_ROOT_PATH,
				use: [
					{
						loader: "responsive-loader",
						options: {
							sizes: [300, 600, 1200, 2000],
							placeholder: true,
							placeholderSize: 20,
						}
					}
				]
			},
		]
	},
};

module.exports = commonConfig;
