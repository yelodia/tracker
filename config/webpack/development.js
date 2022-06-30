const webpack = require('webpack')
const Environment = require('@rails/webpacker/package/environment')
const assetHost = require('@rails/webpacker/package/asset_host')
const merge  = require('webpack-merge')
const config   = require('./shared.js')

class Env extends Environment {
    constructor() {
        super();
    }

    toWebpackConfig() {
        const result = super.toWebpackConfig();
        
        var merged = merge(result, config, {
            output: {
                pathinfo: true
            },
            devtool: 'sourcemap',
            devServer: {
                hot: false,
                inline: false,
                public: 'localhost:3035',
                publicPath: assetHost.publicPath,
                host: 'localhost',
                port: 3035,
                historyApiFallback: true,
                contentBase: assetHost.path,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        });
        
        console.log(merged);
        return merged
    }
};
environment = new Env();
module.exports = environment.toWebpackConfig();
