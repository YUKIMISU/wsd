let native = require('./native')
let getNativeUserid = require('./getNativeUserid')
let getWapUserid = require('./getWapUserid')
module.exports = function(wsloan){
    window.native.isApp === 1 ? getNativeUserid(wsloan) : getWapUserid(wsloan) ;

}