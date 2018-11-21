const webpack = require('webpack');
const path = require('path');

const baseConfig = require('./pc.config.js');
const uglify = require('./uglify');

const webpackConfig = Object.assign({}, baseConfig);

webpackConfig.entry = [
  'babel-polyfill',
  path.resolve(__dirname, '../src/entries/pc.dist.js')
];
webpackConfig.output = {
  filename: 'pc.vendors.js',
  path: path.resolve(__dirname, '../dist/')
};

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    jquery: 'window.$',
    jQuery: 'window.$',
    $: 'window.$'
  })
];

const options = require('./publish.karma.pc');

options.singleRun = true;

let isTestPass = false;
const Server = require('karma').Server;
const server = new Server(options, async function (exitCode) {
  let webpackResult = true;
  let error = '';
  try {
    if (isTestPass) {
      await publish();
    }
  } catch (e) {
    webpackResult = false;
    error = e;
    // console.log(e);
    // throw e;
  } finally {
    if (!webpackResult) {
      console.log(error);
    } else {
      console.log('结束');
    }
    process.exit(exitCode);
  }
});


server.on('browser_register', browser => {
  // console.log('打开浏览器了');
});

server.on('browsers_ready', () => {
  // console.log('浏览器准备完毕');
});

server.on('browser_start', (browser, info) => {
  // console.log(browser, info);
  // console.log('开始测试');
});

server.on('browser_complete', (browser, result) => {
  // console.log('执行完毕', result);
});

server.on('run_start', () => {
  // console.log('开始运行');
});

server.on('run_complete', (browser, result) => {
  // console.log('结束运行', result);
  const {exitCode, error, failed} = result;
  if (exitCode === 0 && !error && failed === 0) {
    console.log('测试通过 开始打包');
    isTestPass = true;
  } else {
    console.log('报错');
  }
});

server.start();

function publish () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, async (err, stats) => {
      if (err) throw err;
      if (stats.compilation.errors.length > 0) {
        reject(stats.compilation.errors[0]);
      }
      await uglify();
      resolve();
    });
  });
}
