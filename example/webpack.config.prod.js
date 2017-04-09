const path = require('path')
const webpack = require('webpack')
//require("babel-polyfill")
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function plugins() {
  return [
    new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
    new webpack.optimize.UglifyJsPlugin(),
    new Visualizer(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new ExtractTextPlugin("./plugins.css"),
  ]
}

function loaders() {
  return [
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
    },
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' },
  ]
}

function entry() {
  return {
    app: './example/index',
    vendor: [ 'react', 'react-dom', 'draft-js', 'immutable']
  }
}

function output() {
  return {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  }
}

/* config */
module.exports = {
  entry: entry(),
  output: output(),
  resolve: { alias: { 'styled-components$': 'styled-components/lib/index.js' } },
  module: { loaders: loaders() },
  plugins: plugins()
}
