const HtmlWebpackPlugin = require('html-webpack-plugin');

/* css modules only seems to work for themes, non css modules for plugin styles */
/* { test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' }, */

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Example', template: './index.html' })
  ],
}
