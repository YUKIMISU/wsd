/**
 * 
 * @param {*string} tmp  模板id
 * @param {*string} cont DOMID
 * @param {* object} data  数据
 */
  function tplBind  (tmp, cont, data) {
    if (!document.getElementById(tmp)) {
      return false;
    }
    var tem = _.template(document.getElementById(tmp).innerHTML);
    var result = tem({
      datas: data
    });
    // document.getElementById(cont).innerHTML = result;
    $('#' + cont)
      .html(result);
  };

  module.exports = tplBind;