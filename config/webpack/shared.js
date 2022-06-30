const webpack = require('webpack');
module.exports = {

    output: {
        // Filename to use in HTML
        filename: '[name]-[hash].js',
    },
    
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue-mc': 'vue-mc/dist/vue-mc.js',
            'vue-resource': 'vue-resource/dist/vue-resource.js'
        }
    },

    module: {
        rules: [
            { test: /\.html$/, use: 'vue-html-loader' }
        ]
    },

    plugins : [
        new webpack.ProvidePlugin({
            _        : "lodash"
        })
    ]
}
