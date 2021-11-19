const WebPackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: '/public/index.js',
    output: {
        path: __dirname + '/public/dist',
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
    },
};

module.exports = config;