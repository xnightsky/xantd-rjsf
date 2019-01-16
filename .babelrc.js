module.exports = {
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ],
  "env": {
    // "development": {
    //     "plugins": ["react-hot-loader/babel"]
    // }
  },
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        // "corejs": false,
        // "helpers": true,
        // "polyfill": true,
        // "regenerator": true,                               // async/await
      }
    ],
    // class-properties
    "@babel/plugin-proposal-class-properties",
    // antd
    [
        "import",
        {
            "libraryName": "antd",
            "style": true,   // or 'css'
        }
    ]
  ]
}
