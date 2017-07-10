var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './assets/js/bundle.js',
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.js?$/,
                exclude: /(node_modules)/
            }
        ]
    },
}