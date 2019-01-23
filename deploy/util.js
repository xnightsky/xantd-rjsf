const path = require('path');
const fs = require("fs");
const merge = require('webpack-merge');


function fragmentMerge (webpackConfig, ifragment) {
  if (typeof ifragment === "function") {
    webpackConfig = ifragment(webpackConfig);
  } else {
    webpackConfig = merge(webpackConfig, ifragment);
  }
  return webpackConfig;
}


function fragmentFileMerge (webpackConfig, filePath) {
  // console.log(file);
  let ifragment = require(filePath);
  webpackConfig = fragmentMerge(webpackConfig, ifragment);
  return webpackConfig
}


function fragmentFinder (webpackConfig, dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    fragmentFileMerge(webpackConfig, path.resolve(dirPath, file));
  });
  return webpackConfig
}


module.exports = {
  fragmentMerge,
  fragmentFinder,
}
