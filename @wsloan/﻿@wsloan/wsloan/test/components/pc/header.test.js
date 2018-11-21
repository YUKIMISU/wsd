var $ = require('../../test-libs/jquery')
var _ = require('../../test-libs/underscore')
_.templateSettings = {
  evaluate: /{%([\s\S]+?)%}/g,
  interpolate: /{%=([\s\S]+?)%}/g,
  escape: /{%-([\s\S]+?)%}/g
};
window.$ = $
window._ = _

var expect = require('chai').expect;
var View = require('../../../src/view/index.js');



describe('PC组件:Header', function () {
  var header

  this.timeout(1000000)
  beforeEach(function () {

  });

  afterEach(function () {
    // $('body').html('')
  })

  it('检查链接', function (done) {
    $('body').html('<div id="J_view"><div id="J_header"></div></div>')
    header = require('../../../components/pc/header')
    setTimeout(function () {
      expect(header.link.memb).to.be.equal('http://122.228.132.78:885/ws.pc/dist/memb/')
      var $a = $('.nav-item').eq(2).find('a').eq(1)
      expect($a.text()).to.be.equal('商户通')
      expect($a.attr('href')).to.be.equal('../invest/index.html?cate=1')
      done()
    }, 300)
  })

  it('菜单栏渲染', function (done) {
    wsloan.mediator.on('top-menu:get', function (data) {
      $('.nav-menu .nav-item').each(function (index) {
        if (data.topList[index]) {
          expect($(this).find('a:eq(0)').text().trim()).to.be.equal(data.topList[index].title)
        }
        $(this).find('.J_nav_sub_menu li').each(function (childIndex) {
          if (data.topList[index].childList) {
            expect($(this).text().trim()).to.be.equal(data.topList[index].childList[childIndex].title)
          }
        })
      })
      done()
    })
  })

  it('判断是否登录', function (done) {
    wsloan.mediator.on('user.ready', function (data) {
      var userinfo = data;
      if (userinfo.isLogin === 1) {
        expect($('#J_user_info_tip').text().trim()).to.be.equal('欢迎，' + userinfo.userName)
        expect($('#J_user_info_tip').length).to.be.equal(1);
      } else {
        expect($('.reg').length).to.be.equal(1);
      }
    })
    done()
  })
})
