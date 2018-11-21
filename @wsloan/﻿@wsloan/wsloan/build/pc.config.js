// var path = require('path');
var webpack = require('webpack');
var {pc: {alias}} = require('./alias');

var config = {
  resolve: {
    alias
  },
  module: require('./module.js'),
  plugins: [
    new webpack.DefinePlugin({
      jquery: 'window.$',
      jQuery: 'window.$',
      $: 'window.$',
      ISTEST: 'true'
    })
  ],
  amd: {
    jQuery: true,
    Underscore: true
  }
};

module.exports = config;
