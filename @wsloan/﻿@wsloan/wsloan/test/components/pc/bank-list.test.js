var expect = require('chai').expect;
var _ = require('../../test-libs/underscore')
var $ = require('../../test-libs/jquery')
window._ = _
window.$ = $
var View = require('../../../src/view/index.js')
BankList = require('../../../components/pc/bank-list/index.js')

describe('bank-list: ', function () {
  this.timeout(30000)
  beforeEach(function () {
    $('body').html('<div id="J_view"></div>')
  })

  it('初始化', function () {
    var vm = new View({
      template: '<div class="J_banklist"></div>',
      el: '#J_view',
      components: {
        'J_banklist': {
          component: BankList,
        }
      }
    })
    expect($('.select').val()).to.at.equal('==选择==')
    expect($('option').length).to.at.least(1)
  });

  it('修改时', function (done) {
    var vm = new View({
      template: '<div class="J_banklist"></div>',
      el: '#J_view',
      data: {
        bank: '农业银行'
      },
      components: {
        'J_banklist': {
          component: BankList,
          props: {
            name: 'bank'
          },
          on: {
            change: function (val) {
              this.bank = val;
            }
          }
        }
      }
    })


    setTimeout(function () {
      $('.select').val('中国工商银行');
      vm.$refs.J_banklist.$TEST_EVENT['change .select']()

      expect(vm.bank).to.equal('中国工商银行');
      expect($('.select').val()).to.equal('中国工商银行');

      done()
    }, 300)


  })

  it('有默认值时', function (done) {
    var vm = new View({
      template: '<div class="J_banklist"></div>',
      el: '#J_view',
      data: {
        bank: '农业银行'
      },
      components: {
        'J_banklist': {
          component: BankList,
          props: {
            name: 'bank'
          }
        }
      }
    })

    setTimeout(function() {
      expect($('select').val()).to.be.equal('农业银行')
      done()
    }, 300);
  })

});
