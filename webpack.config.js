const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Example', template: './index.html' }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ],
}
