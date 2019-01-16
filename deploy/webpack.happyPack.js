const os = require("os");
// const path = require("path");
// const webpack = require('webpack');
const HappyPack = require('happypack');


const ctlvar = require("./ctlvar.js");
const {
  webpack: {
    parallel,
  } = {},
} = ctlvar;


let happyThreadPool = undefined;
if (parallel) {
  happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
  });
}


module.exports = {
  HappyPack,
  happyThreadPool,
}
