const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.




const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),

  new InjectManifest({
    // inject manifest into service worker
    // swSrc represents the service worker file, in this case src-sw.js
    swSrc: './src-sw.js',
    // swDest represents the service worker destination
    swDest: 'sw.js',

  }),
  new WebpackPwaManifest({
    name: 'jate',
    short_name: 'jate',
    description: 'Just another text editor',
    background_color: '#ffffff',
    theme_color: '#000000',
    ios: true,
    crossorigin: 'use-credentials',
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
      },
      {
        src: path.resolve('src/images/logo.png'),
        size: '1024x1024',
        purpose: 'maskable',
      },
    ],
  })

]


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }

      ],
    },
  };
};
