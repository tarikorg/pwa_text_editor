const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.



module.exports = (env, argv) => {
  const isBuild = argv.mode === 'production'



  const productionPlugins = [
    new InjectManifest({

      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/, /\.jpeg$/, /\.svg$/, /\.gif$/, /\.ico$/],


      // inject manifest into service worker
      // swSrc represents the service worker file, in this case src-sw.js
      swSrc: './src-sw.js',
      // swDest represents the service worker destination



    }),

    new WebpackPwaManifest({
      fingerprints: false,
      name: 'pwa-text-editor',
      short_name: 'jate',
      filename: 'manifest.json',
      description: 'Just another text editor',
      background_color: '#ffffff',
      theme_color: '#000000',
      publicPath: '/',
      ios: true,
      crossorigin: 'use-credentials',
      icons: [

        {
          src: './src/images/logo.png',
          destination: path.join('asset', 'icon'),
          sizes: [96, 128, 192, 256, 384, 512],
        },


      ],
    }),
  ]


  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'jate',
      filename: 'index.html',
    }),





  ]


  if (isBuild) {
    plugins.push(...productionPlugins)
  }

  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
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
