const path = require('path');
const fs = require("fs");
const merge = require('webpack-merge');


function fragmentMerge (webpackConfig, ifragment) {
  if (typeof ifragment === "function") {
    // console.log("[fragmentMerge][call]", ifragment);
    webpackConfig = ifragment(webpackConfig);
  } else {
    // console.log("[fragmentMerge][object]", ifragment);
    webpackConfig = merge(webpackConfig, ifragment);
  }
  // console.log("[fragmentMerge][result]", webpackConfig);
  return webpackConfig;
}


function fragmentFileMerge (webpackConfig, filePath) {
  let ifragment = require(filePath);
  // console.log("[fragmentFileMerge]", filePath, ifragment);
  webpackConfig = fragmentMerge(webpackConfig, ifragment);
  return webpackConfig
}


function fragmentFinder (webpackConfig, dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    webpackConfig = fragmentFileMerge(webpackConfig, path.resolve(dirPath, file));
  });
  return webpackConfig
}


module.exports = {
  fragmentMerge,
  fragmentFinder,
}
