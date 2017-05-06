const webpack = require('webpack'),
    path = require('path');
var config = {

    context: __dirname + '/public',

    entry: './ts/main.ts',

    output: {
        filename: './public/js/bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        loaders: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Hammer: "hammerjs/hammer",
            Materialize: "materialize-css"
        })
    ]
}

module.exports = config;