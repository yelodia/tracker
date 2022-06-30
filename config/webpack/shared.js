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
            'vue-router': 'vue-router/dist/vue-router.js',
            'vue-resource': 'vue-resource/dist/vue-resource.js',
            'bootstrap-vue': 'bootstrap-vue/dist/bootstrap-vue.js'
        }
    },

    module: {
        rules: [
            { test: /\.html$/, use: 'vue-html-loader' }
        ]
    },

    plugins : [
        new webpack.ProvidePlugin({
            $        : "jquery",
            jQuery   : "jquery",
            _        : "lodash"
        })
    ]
}
