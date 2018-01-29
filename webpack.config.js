const path = require("path");
const webpack = require("webpack");
const shellPlugin = require("webpack-shell-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");

const publicPath = 'assets/';
const outputPath = '';

const config = {
    // context: '/',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './bundles'),
        publicPath: publicPath
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
                test: /\.s?css$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss'
                        }
                    }
                ]
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
        new shellPlugin({
            onBuildEnd: ['nodemon ./bundles/server.js'],
            dev: true
        })
    ]
}

const clientConfig = merge(config, {
    entry: {
        client: './src/client',
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
