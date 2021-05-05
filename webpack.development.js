const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        injectClient: false
    },
    output: {
        filename: 'bpdCanvas.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'window',
        library: "bpdCanvas",
        umdNamedDefine: true
    },
});