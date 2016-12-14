const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
require("babel-polyfill")

function plugins() {
  return [
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
    new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ]
}

function loaders() {
  return [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      })
    }
  ]
}

function entry() {
  return {
    app: './index',
    vendor: [ 'babel-polyfill', 'react', 'react-dom', 'draft-js', 'immutable', 'linkify-it', 'draft-js-export-html']
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
