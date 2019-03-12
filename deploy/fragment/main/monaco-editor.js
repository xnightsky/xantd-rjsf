const path = require("path");
// const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const ctlvar = require("../../ctlvar.js");
const {
  env: {
    rootname,
    distPath,
    devMode,
  } = {},
  webpack: {
    parallel,
  } = {},
} = ctlvar;
//
const MONACO_DIR = path.resolve(rootname, './node_modules/monaco-editor');
console.log("MONACO_DIR", MONACO_DIR);


module.exports = {
  // module: {
  //   rules: [
  //     {
  //       test: /\.html$/,
  //       use: ['file?name=[name].[ext]'],
  //       include: [MONACO_DIR],
  //     },
  //     {
  //       test: /\.css$/,
  //       include: [MONACO_DIR],
  //       use: ['style-loader', 'css-loader'],
  //     },
  //     {
  //       test: /\.js$/,
  //       include: [MONACO_DIR],
  //       use: {
  //         loader: 'babel-loader',
  //         // loader: parallel ? 'happypack/loader?id=happyBabel' : 'babel-loader',
  //       },
  //     },
  //   ]
  // },
  plugins: [
    new MonacoWebpackPlugin({
      languages: [
        "javascript", "typescript", "html", "json"
      ],
      output: './static/js/monaco-editor/',
    })
  ],
  // optimization: devMode ? {} : {
  //   splitChunks: {
  //     cacheGroups: {
  //       monaco: {
  //         test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
  //         chunks: "initial",
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     },
  //   }
  // }
};
