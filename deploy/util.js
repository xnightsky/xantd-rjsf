const path = require('path');
const fs = require("fs");
const merge = require('webpack-merge');


function fragmentFinder(webpackConfig, dirPath) {
  function requireFragment (file) {
    // console.log(file);
    let ifragment = require(path.resolve(dirPath, file));
    if (typeof ifragment === "function") {
      webpackConfig = ifragment(webpackConfig);
    } else {
      webpackConfig = merge(webpackConfig, ifragment);
    }
  }


  fs.readdirSync(dirPath).forEach((file) => {
    requireFragment(file);
  });
  return webpackConfig
}


module.exports = {
  fragmentFinder,
}
