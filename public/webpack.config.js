const WebPackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: 'index.js',
    output: {
        path: __dirname + '/dist',
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
    plugins: [
        new WebPackPwaManifest({
            fingerprints: false,
            name: 'Online/Offline Budget Tracker',
            short_name: 'Budget',
            description: "An application that can be used to track budget offline or online.",
            background_color: '#ffffff',
            theme_color: '#ffffff',
            short_url: '/',
            icons: [
                {
                src: path.resolve('/icons/icon-512x512.png'),
                sizes: [192, 512],
                destination: path.join('icons')
                }
            ]
        })
    ]
};

module.exports = config;