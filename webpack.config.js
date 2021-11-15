const path = require('path');

module.exports = {

  mode: 'production',

  watch: true,

  entry: './script/main.js',

  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },

  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3
              }
            ]
          ]
        }
      }
    }]
  }

};