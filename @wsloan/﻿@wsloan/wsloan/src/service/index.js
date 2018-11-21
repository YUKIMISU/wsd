var statistic = require('./statistics.js');
var user = require('./user.js');
var userFund = require('./user-fund.js');
var serverTime = require('./server-time.js');
var system = require('./system.js');
var cps = require('./cps.js');
var calcEarn = require('./calc-earn.js');
var qqService = require('./qq-service.js');
var loginDialog = require('./login-dialog.js');
var token = require('./token.js');
var debug = require('./debug.js');

module.exports = {
  system: system,
  statistic: statistic,
  user: user,
  userFund: userFund,
  serverTime: serverTime,
  cps: cps,
  calcEarn: calcEarn,
  qqService: qqService,
  loginDialog:loginDialog,
  token: token,
  debug: debug
};
