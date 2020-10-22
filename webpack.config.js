var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require('webpack')
const config = require('./config')

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: ['react-hot-loader/patch', './src'],
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            hash: true, // This is useful for cache busting
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(config)
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', ".tsx"]
    },
    output: {
        filename: "bundle.js",
        publicPath: '/'
    },

    devServer: {
        port: 4000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
}