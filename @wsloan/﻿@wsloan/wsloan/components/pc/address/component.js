var Address = require('./index.js');

module.exports = {
  template: '<div class="address"></div>',
  data: {
    province: '',
    city: '',
    county: ''
  },
  events: {
    'change select': function ($vm) {
      $vm.$emit('change', {
        province: $vm.address.name.province,
        city: $vm.address.name.city,
        county: $vm.address.name.county,
        value: $vm.address.value,
        name: $vm.address.name
      });
    }
  }, 
  ready: function () {
    var address = new Address({
      el: ''
    });
    this.address = address;
    this.$el.append(address.$html);
    var province = this.province;
    // TODO: 以前数据省份不带省. 因此加了这么一段.
    if (province.indexOf('省') === -1) {
      if (province.indexOf('市') === -1) {
        if (province.indexOf('自治区') === -1) {
          province = province + '省';
        }
      }
    }
    address.render(province, this.city, this.county);
  }
};
