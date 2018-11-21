var chokidar = require('chokidar');
var path = require('path');

var viewBuild = require('./viewBuild.js');

var log = console.log.bind(console);

var watcher = chokidar.watch(path.resolve(__dirname,'*.Vue'), {
  persistent: true,
  ignored:path.resolve(__dirname,'node_modules')
  // followSymlinks: false,
  // useFsEvents: false,
  // usePolling: false
})

watcher
  .on('add', path => log(`${path}`))
  .on('change', path => {
  	log('--------------------正在build-----------------');
  	viewBuild(path);
  })
  .on('unlink', path => log(`File ${path} has been removed`));

// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('-------------  以上文件已经被监听，可以开始code --------------'))
  // .on('raw', (event, path, details) => {
  //   log('Raw event info:', event, path, details);
  // });