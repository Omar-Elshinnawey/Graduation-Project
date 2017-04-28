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
    }
}

module.exports = config;