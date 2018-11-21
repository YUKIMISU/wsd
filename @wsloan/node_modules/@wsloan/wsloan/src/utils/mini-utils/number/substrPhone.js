/**
 * 格式化手机号
 * @param {*手机号码} phone 
 */
function phone (phone) {
    phone = phone + '';
    return phone.substr(0, 4) + '****' + phone.substr(8);
}
module.exports = phone;