const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PUBLIC_PATH = `${path.resolve('dist')}`;
const SERVER_PATH = path.resolve('app/server');

module.exports = function () {
    return {
        mode: "development",
        entry: {
            "server": "./app/server/server.js"
        },
        target: 'node',
        output: {
            path: PUBLIC_PATH, // When transpiled webpack, this is the final destination for assets
            filename: 'server.js', // The name and directory we want our js to end up
            publicPath: '/',
        },
        // Source maps support ('inline-source-map' also works)
        devtool: 'source-map',

        // Add the loader for .ts files.
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-0', 'es2015']
                        }
                    }]

                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: [/dist/, /node_modules/],
                    use: [{loader: "source-map-loader"}]
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    use: [{loader: 'graphql-tag/loader'}]
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader', options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'sass-loader'
                        }]
                    })
                },
                {
                    test: /\.ejs$/,
                    use: 'ejs-compiled-loader?htmlmin'
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'},
                        {
                            loader: 'img-loader',
                            options: {
                                enabled: process.env.NODE_ENV === 'production'
                            }
                        }
                    ]
                }]
        },
        resolve: {
            extensions: [".scss", ".ejs", ".js", ".json", ".jsx", ".gql", ".eot", ".woff", ".ttf", ".svg"],
            alias: {
                'app': path.resolve('./dist/lib/app'),
                'common': path.resolve('./common'),
                'components': path.resolve('./components'),
                './node_modules/iconv-lite/encodings/tables/gb18030-ranges.json': path.resolve('./node_modules/node-noop'),
            },

        },
        plugins: [
            // require bug with crypto
            new webpack.DefinePlugin({"global.GENTLY": false}),
            new MiniCssExtractPlugin('css/bundle.css'),
            new webpack.NormalModuleReplacementPlugin(
                /\/iconv-loader$/,
                'node-noop'
            ),
            new webpack.ContextReplacementPlugin(
                /ejs[\/\\]lib$/,
                'node-noop'),
            new webpack.ContextReplacementPlugin(
                /express[\/\\]lib$/,
                'node-noop'),
            new CopyWebpackPlugin([
                {from: SERVER_PATH + '/views/**/*', to: "views/[name].[ext]"}
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    CAKE_ENDPOINT: JSON.stringify(process.env.CAKE_ENDPOINT),
                },
                'process.title': 'cake-app'
            }),
        ],
    }
};