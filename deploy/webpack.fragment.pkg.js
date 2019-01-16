/*
PS: autodll-webpack-plugin 不支持按需加载，也不支持 `Support tree-shaking for dll plugin`
*/

// const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ctlvar = require("./ctlvar.js");
const {
  env: {
    devMode,
  } = {},
} = ctlvar;


module.exports = {
  optimization: devMode ? {} : {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          chunks: "initial",
          test: /node_modules/,
          priority: -10,
        },
        // default: {
        //   chunks: "initial",
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      },
    }
  },
}
