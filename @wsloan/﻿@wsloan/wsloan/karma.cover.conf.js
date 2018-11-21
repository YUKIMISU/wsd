// Karma configuration
// Generated on Tue Apr 18 2017 18:49:15 GMT+0800 (中国标准时间)

const webpackConfig = require('./build/pc.config');


module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'src/view/index.js'
    ],
    preprocessors: {
      'src/view/index.js': ['webpack', 'coverage'],
      'test/view/index.test.js': ['webpack', 'coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-chrome-launcher',
      // 'karma-babel-preprocessor',
      'karma-webpack'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    webpack: webpackConfig
  });
};
