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
      // new UglifyJsPlugin({
      //   parallel: true,
      //   sourceMap: true,
      //   uglifyOptions: {
      //     // ecma:8,
      //     compress: {
      //       warnings: false
      //     }
      //   },
      // })
      new UglifyJsPlugin({
        // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true,           // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false,   // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
    ]
  },
  plugins: [],
};
