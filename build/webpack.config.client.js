const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const idDev = process.env.NODE_ENV === 'development'
const config = webpackMerge(baseConfig,{
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]  
})

if(idDev) {
    // config.entry = {
    //     app: [
    //       'react-hot-loader/patch',
    //       path.join(__dirname, '../client/app.js')
    //     ]
    // }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config