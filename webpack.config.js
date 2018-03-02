var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  watch: true,
  context: path.resolve(__dirname, "client/scripts"),
  entry: {
    main: "./startup",
    login: "./login"
  },
  node: {
    fs: "empty",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle-[name].js",
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
    chunks: ['login'],
    filename: 'login.html',
    template: '../html/login.html',
    title: 'dido.knx'
  }),
  new HtmlWebpackPlugin({
    chunks: ['main'],
    filename: 'index.html',
    template: '../html/login.html',
    title: 'dido.knx'
  })]
};