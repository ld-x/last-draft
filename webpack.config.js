const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  output: { filename: 'bundle.js', publicPath: '' },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]__[hash:base64:5]' } },
          'postcss-loader', // see postcss.config.js
        ]
      },
      {
        test: /\.js$/,
        use: [ { loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-0'] } } ],
        exclude: /node_modules/,
      }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Example', template: './index.html' }),
  ],
}
