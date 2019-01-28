// const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ctlvar = require("./ctlvar.js");
const {
  env: {
    distPath,
  } = {},
} = ctlvar;


module.exports = {
  mode: "production",
  output: {
    path: distPath,
    filename: '[name].[chunkhash].bundle.js',
    // AutoDllPlugin 默认 publicPath `/xxx.js`
    // 配置在 dev, 会导致 `not get /`
    publicPath: './',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          // ecma:8,
          compress: {
            warnings: false
          }
        },
      })
    ]
  },
  plugins: [
  ],
};
