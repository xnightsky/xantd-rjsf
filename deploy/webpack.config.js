const path = require('path');
// const webpack = require('webpack');
const merge = require('webpack-merge');

const { fragmentFinder, } = require("./util.js");
const ctlvar = require("./ctlvar.js");
const {
  env: {
    rootname, distPath, devMode,
  } = {},
  webpack: {
    analyzer,
    print: {
      result: printResult,
    } = {},
  }
} = ctlvar;


const configBase = require('./webpack.fragment.base.js');
const configPkg = require('./webpack.fragment.pkg.js');
let configEnv = {};
if (process.env.NODE_ENV == 'production') {
  configEnv = require('./webpack.fragment.prod.js');
} else {
  configEnv = require('./webpack.fragment.dev.js');
}


let webpackConfig = merge(
  configBase,
  configPkg,
  configEnv,
);

if (analyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  webpackConfig.plugins = webpackConfig.plugins.concat(
    [
      new BundleAnalyzerPlugin(),
      new SpeedMeasurePlugin(),
    ]
  );
}

webpackConfig = fragmentFinder(webpackConfig, path.resolve(__dirname, "./fragment/main"));


if (printResult) {
  console.log(webpackConfig);
}

module.exports = webpackConfig;
