var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  watch: true,
  context: path.resolve(__dirname, "client/scripts"),
  entry: "./startup",
  node: {
    fs: "empty",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.html$/, exclude: /node_modules/, use: { loader: "html-loader" } },
      { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: "dido.knx"
  })]
};