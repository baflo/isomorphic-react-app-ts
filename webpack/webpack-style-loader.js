const path = require("path");

const {
	SOURCE_ROOT_PATH,
	GLOBAL_STYLE_FILE, } = require("./paths");

const { cssRegEx } = require("./regex");

function styleLoader(WebpackExtractTextPlugin, config = {}) {
	const include = config.include || undefined;
	const exclude = config.exclude || undefined;
	const cssModules = config.cssModules || false;
	const cssMinimize = config.cssMinimize || false;

	const extractPluginUsedLoaders = [];

	if (cssModules) {
		extractPluginUsedLoaders.push({
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
		extractPluginUsedLoaders.push({
			loader: "css-loader",
			options: {
				importLoaders: 2,
				alias: {
					"../fonts": "bootstrap/fonts",
				},
			}
		});
	}

	extractPluginUsedLoaders.push({
		loader: "sass-loader",
	});

	extractPluginUsedLoaders.push({
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
		use: WebpackExtractTextPlugin.extract({
			// fallback: "style-loader",
			use: extractPluginUsedLoaders,
			allChunks: true
		})
	}
};

exports.localStylesLoader =
	(WebpackExtractTextPlugin) => styleLoader(WebpackExtractTextPlugin, {
		include: [SOURCE_ROOT_PATH],
		exclude: [GLOBAL_STYLE_FILE],
		cssModules: true,
	});

exports.globalStylesLoader =
	(WebpackExtractTextPlugin) => styleLoader(WebpackExtractTextPlugin, {
		include: [GLOBAL_STYLE_FILE],
		cssModules: false,
	});
