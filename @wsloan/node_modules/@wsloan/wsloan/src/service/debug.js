var utils = require('../utils')
module.exports =   function(){
    if (utils.getString('debug') === '1') {
        var src = '//static.wsloan.com/Script/eruda.min.js';
        document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
        document.write('<scr' + 'ipt>eruda && eruda.init();</scr' + 'ipt>');
        }
}