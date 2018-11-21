function getString(name) {
    var urlparams = location.search;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = urlparams.substr(1)
        .match(reg);
    if (r != null) return r[2];
    return null;
};
var isTest = (location.host.match(/192|122|127|172|36.7|localhost|:8081|:8080|169.254|report.wsloan.com|wsloan-stg|10[.]0/) != null && location.host.match(/report.wsloan.com:8888/) === null && getString('isTest') !== '0') || getString('isTest') === '1' ; // base交叉引用，打包有问题

module.exports = isTest