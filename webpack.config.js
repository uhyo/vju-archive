"use strict";
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

// production用の設定がある
const plugins = 
    process.env.NODE_ENV === 'production' ?
    [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
    ] :
    [];

const baseConfig = {
    devtool: 'source-map',
    entry: './dist-es6/renderer/entrypoint.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?modules&camelCase', 'postcss-loader'],
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
            },
            {
                test: /\.(?:png|gif)$/,
                loaders: ['url-loader', 'img-loader'],
            }
        ]
    },
    plugins,
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    performance: {
        //bye bye, FIXME...
        hints: false,
    },
    
    devServer: {
        contentBase: './dist',
        port: 8080,
    }
};

module.exports = [
    baseConfig,
    webpackMerge(baseConfig, {
        entry: './dist-es6/main/index.js',
        target: 'node',
        output: {
            path: path.join(__dirname, 'dist', 'main'),
            filename: 'index.js',
        },
        node: {
            __dirname: false,
        },
        externals: [
            nodeExternals(),
        ],
    }),
];
