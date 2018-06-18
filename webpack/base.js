const path = require('path');
const webpack = require('webpack');

/**
 * Asset Paths
 * Modify these to match your project.
 */
const ASSET_PATH = path.resolve('app');
const APP_FILE_PATH = `${ASSET_PATH}/index.jsx`;
const PUBLIC_PATH = `${path.resolve('dist')}/web`;

module.exports = function (env) {
    return {
        entry: APP_FILE_PATH,
        // Tells webpack where to start requiring assets from
        output: {
            path: PUBLIC_PATH, // When transpiled webpack, this is the final destination for assets
            filename: 'js/[name].js', // The name and directory we want our js to end up
            publicPath: '/'
        },
        resolve: {
            alias: {
                'app': path.resolve('./dist/lib/app'),
                'common': path.resolve('./common'),
                'components': path.resolve('./components'),
            },
            extensions: [".scss", ".ejs", ".js", ".json", ".jsx", ".gql", ".eot", ".woff", ".ttf", ".svg"]
        },
        module: {
            // Loaders are the preprocessors used to transpile SASS to CSS or ES6 JavaScript to ES5 JavaScript
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.jsx?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-0', 'es2015', 'react']
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
                    loader: 'graphql-tag/loader'
                },
                {
                    test: /\.json$/,
                    use: ['json-loader']
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
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
                }
            ],
        },
        devtool: 'inline-source-map',
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 9000,
            historyApiFallback: true,
            publicPath: "/dist/",
            setup(app) {
                const express = require('express');
                const webRoot = path.resolve(__dirname + '/../dist/web/');
                const options = {root: webRoot};

                // static path to web folder
                app.use(express.static(webRoot, {index: 'index.html'}));

                app.get('*', (req, res) => {
                    res.sendFile('index.html', options);
                });

                app.post('*', (req, res) => {
                    res.redirect('/');
                });
            },
            hot: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    manifest: {
                        name: 'manifest'
                    }
                }
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    CAKE_ENDPOINT: JSON.stringify(process.env.CAKE_ENDPOINT)
                }
            }),
            // require bug with crypto
            new webpack.DefinePlugin({"global.GENTLY": false}),
            // copy static htmlconfig.optimization.splitChunks to dist folder
            // new CopyWebpackPlugin([
            //     { from: ASSET_PATH + '/html/**/*', to: "[name].[ext]" }
            // ]),
            // enable HMR globally
            new webpack.NamedModulesPlugin()
        ]
    }
};