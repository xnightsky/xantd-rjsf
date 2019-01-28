module.exports = {
  "presets": [
      // "@babel/preset-env",
      [
        '@babel/preset-env',
        {
          shippedProposals: true, // to support spread operators
          forceAllTransforms: true
        }
      ],
      "@babel/preset-react"
  ],
  "env": {
    // "development": {
    //     "plugins": ["react-hot-loader/babel"]
    // }
    "production": {
      "plugins": [
        [
          "transform-react-remove-prop-types",
          {
            "mode": "wrap",
            "ignoreFilenames": ["node_modules"]
          }
        ]
      ]
    }
  },
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
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
