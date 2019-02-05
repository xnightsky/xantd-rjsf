const path = require("path");


const rootname = path.resolve(__dirname, '..');


module.exports = {
  env: {
    rootname,                                          // 项目根目录
    // publicPath: "/dist",
    distPath: path.join(rootname, './dist'),           // 构建结果输出目录
    devMode: process.env.NODE_ENV !== 'production',    // 是否非生产模式
  },
  package: {},
  webpack: {
    // 并行处理
    // TODO: 扩展成 {} 详细配置
    parallel: false,
    // 加载 webpack 分析插件
    analyzer: false,
    print: {
      // 打印结果
      result: false,
    },
  },
  language: {},
};
