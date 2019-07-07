//webpack v4
const path = require('path');
const MiniCssExtractLoader = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    MiniCssExtractLoader.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractLoader({filename: 'style.[contenthash].css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
    ]
};