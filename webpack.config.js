var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        main: [
            './app/index.tsx'
        ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.less', '.css']
    },
    output: {
        path: path.join(__dirname, './out'),
        publicPath: '/assets/dev/',
        filename: '[name].js'
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true
      })
    ],
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                use: 'ts-loader?' + JSON.stringify({                    
                    transpileOnly: false,
                    logInfoToStdOut: true
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },    
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: {
            index: 'index.html'
        }        
    }
};
