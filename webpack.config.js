const path = require("path");
const webpack = require("webpack");
const ShellPlugin = require("webpack-shell-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");

const STYLE_GLOBAL_FILE = "__global.css";
const PUBLIC_PATH = 'assets/';
const OUTPUT_PATH = '';


function styleLoader(config = {}) {
    const include = config.include || undefined;
    const exclude = config.exclude || undefined;
    const cssModules = config.cssModules || false;
    const cssMinimize = config.cssMinimize || false;

    return {
        test: /.s?css$/,
        include,
        exclude,
        use: [
            "isomorphic-style-loader",
            {
                loader: "typings-for-css-modules-loader",
                options: {
                    modules: cssModules,
                    namedExport: true,
                    camelCase: true,
                    importLoaders: 1,
                    minimize: cssMinimize,
                    localIdentName: cssMinimize ? "[hash:12]" : "[local]____[path][name]____[hash:base64:5]",
                    alias: {
                        "../fonts": "bootstrap/fonts",
                    },
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    parser: 'postcss-scss',
                    plugins: [
                        require("postcss-import")({})
                    ]
                }
            }
        ]
    }
}

const config = {
    // context: '/',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './bundles'),
        publicPath: PUBLIC_PATH
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /.s?css$/,
                exclude: path.join(__dirname, 'src/global.css'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                importLoaders: 1,
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                localIdentName: false ? "[hash:12]" : "[local]____[path][name]____[hash:base64:5]",
                                alias: {
                                    "../fonts": "bootstrap/fonts",
                                },
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                parser: 'postcss-scss',
                                plugins: [
                                    require("postcss-import")({})
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /.s?css$/,
                include: path.join(__dirname, 'src/global.css'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                alias: {
                                    "../fonts": "bootstrap/fonts",
                                },
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                parser: 'postcss-scss',
                                plugins: [
                                    require("postcss-import")({})
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(?:jpg|jpeg|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]',
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
        new ShellPlugin({
            onBuildEnd: ['nodemon ./bundles/server.js'],
            dev: true
        }),
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        })
    ]
}


const clientConfig = merge(config, {
    entry: {
        client: [
            './src/global.css',
            './src/client'
        ]
    },
    output: {
        library: ['App']
    }
});

const serverConfig = merge(config, {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: {
        server: './src/server'
    },
    externals: [
        nodeExternals({
            whitelist: [/^purecss/]
        })
    ]
});

module.exports = [clientConfig, serverConfig];
