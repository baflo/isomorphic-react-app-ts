const webpack = require("webpack");
const WebpackExtractTextPlugin = require("extract-text-webpack-plugin");

const {
	GLOBAL_STYLE_FILE,
	SOURCE_ROOT,
	PUBLIC_STYLE_FILE,
	TYPINGS_DIR,
} = require("./paths");
const { globalStylesLoader, localStylesLoader } = require("./webpack-style-loader");

process.env.DEBUG = true;
process.env.NODE_ENV = "development";

const commonConfig = {
	// context: "/",
	devtool: "inline-source-map",
	plugins: [
		new webpack.EnvironmentPlugin([
			"NODE_ENV",
			"DEBUG",
		]),
		new WebpackExtractTextPlugin("../client/styles.css", {
			allChunks: true,
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.WatchIgnorePlugin([
			/css\.d\.ts$/
		]),
	],
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			globalStylesLoader(WebpackExtractTextPlugin),
			localStylesLoader(WebpackExtractTextPlugin),
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.tsx?$/,
				include: SOURCE_ROOT,
				loader: "awesome-typescript-loader"
			},
		]
	}
};

module.exports = commonConfig;
