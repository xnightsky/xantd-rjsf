const path = require("path");
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const {
  HappyPack,
  happyThreadPool,
} = require("./webpack.happyPack.js");
const ctlvar = require("./ctlvar.js");
const {
  env: {
    rootname, distPath, devMode,
  } = {},
  webpack: {
    parallel,
  } = {},
} = ctlvar;


// function resolve(relatedPath) {
//   return path.join(rootname, relatedPath)
// }


module.exports = {
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        // test: /\.js$/,
        test:/\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: parallel ? 'happypack/loader?id=happyBabel' : 'babel-loader',
        },
      },
      {
        test: /\.(le|c)ss$/,
        // exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              // modifyVars: antThemeVars
            }
          }
        ],
      },
      {
        test:/\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use:[{
            loader:'url-loader',
            options:{
                limit: 50000,
                outputPath: 'images'
            }
        }]
    }

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      // __development__: JSON.stringify(process.env.NODE_ENV),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ProgressBarPlugin(),
    ...(
      parallel ? [
        new HappyPack({
          //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: true,
        }),
        // new HappyPack({
        //   //用id来标识 happypack处理那里类文件
        //   id: 'happyStyle',
        //   //如何处理  用法和loader 的配置一样
        //   loaders: [ 'css-loader?sourceMap=true', 'less-loader?sourceMap=true' ],
        //   //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
        //   threadPool: happyThreadPool,
        //   //允许 HappyPack 输出日志
        //   verbose: true,
        // }),
      ] : []
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new CleanWebpackPlugin([
      distPath,
    ]),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ]
};
