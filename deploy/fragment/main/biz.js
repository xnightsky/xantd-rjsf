const path = require("path");
// const webpack = require('webpack');


const ctlvar = require("../../ctlvar.js");
const {
  env: {
    rootname
  } = {},
} = ctlvar;


// module.exports = function (webpackConfig) {
//   return webpackConfig;
// };

module.exports = {
  resolve: {
    alias: {
      "$src": path.resolve(rootname, 'src/'),
    }
  }
};
