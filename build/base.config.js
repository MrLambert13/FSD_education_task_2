//webpack v4
const path = require('path');
const fs = require('fs');

const MiniCssExtractLoader = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

const PAGES_DIR = path.resolve(PATHS.src, 'pug', 'pages');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

//base config
module.exports = {
    entry: path.resolve(PATHS.src),
    output: {
        path: PATHS.dist,
        filename: 'assets/js/[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.pug$/,
            loader: 'pug-loader'
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                MiniCssExtractLoader.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }]
    },
    plugins: [
        new MiniCssExtractLoader({filename: 'style.[contenthash].css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/assets/img`, to: `assets/img`},
            {from: `${PATHS.src}/static`, to: ''},
        ]),

        // Automatic creation any html pages
        // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        })),

        new WebpackMd5Hash(),
    ]
};