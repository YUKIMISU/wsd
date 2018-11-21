var $ = require('../../test-libs/jquery')
var _ = require('../../test-libs/underscore')
_.templateSettings = {
  evaluate: /{%([\s\S]+?)%}/g,
  interpolate: /{%=([\s\S]+?)%}/g,
  escape: /{%-([\s\S]+?)%}/g
};
window.$ = $
window._ = _

var wsloan = require('../../../src/entries/pc')
var Address = require('../../../components/pc/address/component.js')
var View = require('../../../src/view/index.js')
var expect = require('chai').expect

describe('PC组件: Address', function () {
  this.timeout(1000)
  beforeEach(function () {
    $('body').html('<div id="J_view"></div>')
  })

  it('初始化', function (done) {
    var vm = new View({
      el: '#J_view',
      template: '<div class="J_address"></div>',
      components: {
        'J_address': {
          component: Address
        }
      }
    })

    setTimeout(function () {
      expect($('select').length).to.equal(3)
      expect($('option').length).to.least(3)
      expect($('.address-province').val()).to.be.equal('0');
      done()
    }, 300)
  })
  // TODO: 没法触发 change 事件. 测不了.
  it.skip('值变化', function (done) {
    var vm = new View({
      el: '#J_view',
      template: '<div class="J_address"></div>',
      data: {
        province: '',
        city: '温州市',
        county: '龙湾区',
        value: 0,
        name: '请选择'
      },
      components: {
        'J_address': {
          component: Address,
          on: {
            change: function (val) {
              this.province = val.province;
              this.city = val.city;
              this.county = val.county;
            }
          },
          props: {
            province: 'province',
            city: 'city',
            county: 'county'
          }
        }
      }
    })

    window.vm = vm
    setTimeout(function () {
      $('.address-province').val('120000')
      // vm.$refs['J_address'].address.render('浙江省', '温州市', '龙湾区')
      vm.$refs['J_address'].$TEST_EVENT['change select']()
    }, 300)

    setTimeout(function () {
      done();
    }, 100000)
  })

  it('有默认值的情况', function (done) {
    var vm = new View({
      el: '#J_view',
      template: '<div class="J_address"></div>',
      data: {
        province: '浙江省',
        city: '温州市',
        county: '龙湾区',
      },
      components: {
        'J_address': {
          component: Address,
          props: {
            province: 'province',
            city: 'city',
            county: 'county'
          }
        }
      }
    })
    setTimeout(function () {
      expect($('select:eq(0)').val()).to.be.equal('330000')
      expect($('select:eq(1)').val()).to.be.equal('330300')
      done()
    }, 300)


  })
})