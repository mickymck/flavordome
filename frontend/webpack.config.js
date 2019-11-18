var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './src/main',
  output: {
      path: path.resolve('./assets/webpack_bundles/'),
      filename: "[name].js"
  },
plugins:[
  new VueLoaderPlugin(),
  new BundleTracker({filename: './webpack-stats.json'})
],

  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ['vue-style-loader', 'css-loader'],
      }
    ]
  },
}
