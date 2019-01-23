const path = require("path");
const webpack = require('webpack');

const ctlvar = require("./ctlvar.js");
const {
  env: {
    distPath,
    publicPath,
  } = {},
} = ctlvar;



module.exports = {
  mode: "development",
  output: {
    path: distPath,
    filename: '[name].[hash].bundle.js',
    // publicPath: publicPath,
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    open: true,
    host: 'localhost',
    port: '8989',
    contentBase: distPath,
    compress: true,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    https: false,
    noInfo: false,
    disableHostCheck: true,
    headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS"
		},
    proxy: {}
  },
  // watch: true,
  // watchOptions:{
  //     ignored: /node_modules/,
  // },
};
