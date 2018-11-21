var html = require('./index.html');
var select = require('./select.html');
require('./index.scss');

var address_data = require('../json/address.json');
// var wsloan = require('../../wsloan/wsloan.js');
var $ = window.$;
var _ = window._;

var select_compiled = _.template(select);

var province_data = _.filter(address_data, function (data) {
  return !data.parent;
});

// 通过数字值 查找某个父类下的所有子类
function find (parentValue) {
  return _.filter(address_data, function (data) {
    return data.parent === parentValue;
  });
}

// 返回生成的选框
function select_init (items, selected, className) {
  return select_compiled({
    items: items,
    selected: selected,
    className: className
  });
}

// 转换
function conversion (from, to) {
  return function (value) {
    var obj = {};
    obj[from] = value.toString();
    var result = _.filter(address_data, obj);
    result = result.length > 0 ? result[0][to] : '';
    return result;
  };
}

// 名字转数值
var nameToValue = conversion('name', 'value');
// 数值转名字
var valueToName = conversion('value', 'name');

function select_render ($elem, className) {
  return function (item, selected) {
    $elem.html(select_init(item, selected, className));
  };
}


function dataInit () {
  return {
    province: '',
    city: '',
    county: ''
  };
};

function setValue (key, val) {
  this.value[key] = val;
  this.name[key] = valueToName(val);
}

function init () {
  var that = this;
  this.$province.on('change', 'select', function () {
    var val = $(this).val();
    var city = find(val);
    var county = find(city[0].value);
    that.city_render(city, '');
    that.county_render(county, '');
    that.setValue('province', val);
    that.setValue('city', city[0].value);
    that.setValue('county', county[0].value);
  });

  this.$city.on('change', 'select', function () {
    var val = $(this).val();
    var county = find(val);
    that.county_render(county, '');
    that.setValue('city', val);
    that.setValue('county', county[0].value);
  });

  this.$county.on('change', 'select', function () {
    that.setValue('county', $(this).val());
  });
}

function render (province, city, county) {
  var county_value;
  var city_value;
  var province_value;

  if (arguments.length === 0) {
    province_value = '0';
    city_value = '00';
    county_value = '000';
  } else {
    province_value = province === '' ? '0' : nameToValue(province);
    city_value = city === '' ? '00' : nameToValue(city);
    county_value = county === '' ? '000' : nameToValue(county);
  }

  this.$province.html(select_init(province_data, province_value)).find('select').addClass('address-province');
  this.city_render(find(province_value), city_value);
  this.county_render(find(city_value), county_value);

  this.setValue('province', province_value);
  this.setValue('city', city_value);
  this.setValue('county', county_value);
}

function Address (obj) {
  this.name = dataInit();
  this.value = dataInit();
  this.$html = $(html);
  this.$province = this.$html.find('.address-province-wrap');
  this.$city = this.$html.find('.address-city-wrap');
  this.$county = this.$html.find('.address-county-wrap');

  this.city_render = select_render(this.$city, 'address-city');
  this.county_render = select_render(this.$county, 'address-county');
  this.init();
  if (obj && obj.el) {
    $(obj.el).html(this.$html);
  }
  if (obj) {
    this.render(obj.province || '请选择省', obj.city || '请选择市', obj.county || '请选择区');
  } else {
    this.render();
  }
}
Address.prototype.nameToValue = nameToValue;
Address.prototype.valueToName = valueToName;
Address.prototype.render = render;
Address.prototype.init = init;
Address.prototype.setValue = setValue;

module.exports = Address;
