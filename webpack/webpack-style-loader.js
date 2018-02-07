const path = require("path");

const {
	SOURCE_ROOT_PATH,
	GLOBAL_STYLE_FILE, } = require("./paths");

const { cssRegEx } = require("./regex");

function styleLoader(config = {}) {
	const WebpackExtractTextPlugin = config.WebpackExtractTextPlugin || undefined;
	const include = config.include || undefined;
	const exclude = config.exclude || undefined;
	const cssModules = config.cssModules || false;
	const cssMinimize = config.cssMinimize || false;

	const loaders = [];

	if (!WebpackExtractTextPlugin) {
		loaders.push({
			loader: "style-loader",
		})
	}

	if (cssModules) {
		loaders.push({
			loader: "typings-for-css-modules-loader",
			options: {
				alias: {
					"../fonts": "bootstrap/fonts",
				},
				importLoaders: 2,
				minimize: cssMinimize,
				modules: cssModules,
				camelCase: true,
				localIdentName: cssMinimize ? "[hash:12]" : "[local]____[path][name]",
				namedExport: true,
			}
		});
	}
	else {
		loaders.push({
			loader: "css-loader",
			options: {
				importLoaders: 2,
				alias: {
					"../fonts": "bootstrap/fonts",
				},
			}
		});
	}

	loaders.push({
		loader: "sass-loader",
	});

	loaders.push({
		loader: "postcss-loader",
		options: {
			parser: "postcss-scss",
			plugins: [
				require("postcss-import")({})
			]
		}
	});

	return {
		test: cssRegEx,
		include,
		exclude,
		use: !WebpackExtractTextPlugin
			? loaders
			: WebpackExtractTextPlugin.extract({
				use: loaders,
				allChunks: true
			})
	}
};

exports.localStylesLoader =
	(WebpackExtractTextPlugin) => styleLoader({
		WebpackExtractTextPlugin,
		include: [SOURCE_ROOT_PATH],
		exclude: [GLOBAL_STYLE_FILE],
		cssModules: true,
	});

exports.globalStylesLoader =
	(WebpackExtractTextPlugin) => styleLoader({
		WebpackExtractTextPlugin,
		include: [GLOBAL_STYLE_FILE],
		cssModules: false,
	});
