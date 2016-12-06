const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function plugins() {
  return [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ]
}

function loaders() {
  return [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css-loader')
    }
  ]
}

function entry() {
  return {
    app: './index',
    vendor: [ 'react', 'react-dom', 'draft-js']
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
  module: { loaders: loaders() },
  plugins: plugins()
}
