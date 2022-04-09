module.exports = {
  "presets": [
    // [
    //   "es2015",
    //   "stage-3"
    // ]
    [
      '@babel/preset-typescript'
    ],
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "8"
        },
        "useBuiltIns": "entry",
        "corejs": "3.6.5"
      }
    ]
  ],
  "plugins": [],
}