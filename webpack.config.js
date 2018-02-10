var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, "client/scripts"),
  entry: "./startup",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "raw-loader" }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: "dido.knx"
  })]
};