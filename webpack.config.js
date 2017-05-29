const webpack = require('webpack'),
    path = require('path'),
    CircularDependancyPlugin = require('circular-dependency-plugin');
var config = {

    context: __dirname + '/public',

    entry: {
        bundle: './ts/main.ts',
        vendor: './ts/vendor.ts',
        polyfills: './ts/polyfills.ts'
    },

    output: {
        filename: './public/js/[name].js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        loaders: [{
            test: /\.ts?$/,
            loaders: ['ts-loader', 'angular-router-loader'],
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            Hammer: "hammerjs/hammer"
        }),
        new CircularDependancyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './public/ts'), {}
        ),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['bundle', 'vendor', 'polyfills']
        })
    ]
}

module.exports = config;