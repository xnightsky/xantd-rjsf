// const path = require("path");
// const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  plugins: [
    new MonacoWebpackPlugin()
  ]
};
