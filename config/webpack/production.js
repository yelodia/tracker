const webpack = require('webpack')
const Environment = require('@rails/webpacker/package/environment')
const merge  = require('webpack-merge')
const config   = require('./shared.js')

class Env extends Environment {
    constructor() {
        super();

        this.plugins.set('UglifyJs', new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }))
    }

    toWebpackConfig() {
        const result = super.toWebpackConfig();
        var merged = merge(result, config, {
            devtool: 'nosources-source-map'
        });
        return merged
    }
};
environment = new Env();

module.exports = environment.toWebpackConfig();
