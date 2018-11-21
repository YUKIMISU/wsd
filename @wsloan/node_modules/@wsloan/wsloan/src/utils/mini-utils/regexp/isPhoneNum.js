/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/.test(str)
}

module.exports = isPhoneNum