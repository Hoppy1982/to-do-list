const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './client/src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist',
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(['client/dist/*']),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      filename: './index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/client/],
        exclude: [/node_modules/, /server/],
        use: {loader: 'babel-loader'}
      },
      {
        test: /\.html$/,
        use: [{loader: 'html-loader'}]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader'
      }
    ]//end of rules
  }
};
