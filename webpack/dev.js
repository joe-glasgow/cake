/* global require, module */
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeJsPlugin = require('optimize-js-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./base.js');

// history middleware

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        mode: "development",
        devtool: 'eval-source-map',
        target: "web",
        stats: "errors-only",
        plugins: [
            // Bund leAnalyzerPlugin will show you how much space each library in your app is using.
            //new BundleAnalyzerPlugin(),
            //  Live Reload
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:3200/',
                // plugin options
            }),
            new MiniCssExtractPlugin('css/bundle.css'),
            new ExtractTextPlugin("css/styles.css"),
            new OptimizeJsPlugin({
                sourceMap: true,
            }),
        ],
        module: {
            rules: [{
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },   {
                test: require.resolve("react-addons-perf"),
                use: {
                    loader: "expose?Perf"
                }
            }]
        }
    })
};