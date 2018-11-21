//  断言库
var chai = require('chai')
var expect = chai.expect

var $ = require('../test-libs/jquery.js')

window.$ = $
// console.log($.browser)
//  引用测试函数
var formSubmit = require('../../src/view/formSubmit.js')

describe('表单提交', function () {
  // 测试前需要清空 body
  beforeEach(function () {
    $('body').html('')
  })


  it.skip('表单提交基础测试: ', function () {
    formSubmit({
      url: 'http://www.baidu.com',
      data: {}
    })

    var $body = $('body')
    var $form = $body.find('form')
    var $input = $form.find('input')
    // body 中只有一个 form
    expect($form.length).to.be.equal(1)
    expect($form.attr('action')).to.be.equal('http://www.baidu.com')
    expect($form.attr('methods')).to.be.equal('get')
    expect($form.attr('target')).to.be.equal('_blank')
    expect($form.css('display')).to.be.equal('none')
    expect($input.length).to.be.equal(0)
  })

  it.skip('表单提交POST测试: ', function () {
    formSubmit({
      url: 'http://www.baidu.com',
      methods: 'post',
      data: {}
    })

    var $body = $('body')
    var $form = $body.find('form')
    var $input = $form.find('input')
    expect($form.length).to.be.equal(1)
    expect($form.attr('action')).to.be.equal('http://www.baidu.com')
    expect($form.attr('methods')).to.be.equal('post')
    expect($form.attr('target')).to.be.equal('_blank')
    expect($form.css('display')).to.be.equal('none')
    expect($input.length).to.be.equal(0)
  })

  it.skip('表单提交基础带数据测试: ', function () {
    formSubmit({
      url: 'http://www.baidu.com',
      data: {
        name: 'lilei',
        age: 12
      }
    })

    var $body = $('body')
    var $form = $body.find('form')
    var $input = $form.find('input')
    var $input1 = $input.eq(0)
    var $input2 = $input.eq(1)

    expect($form.length).to.be.equal(1)
    expect($form.attr('action')).to.be.equal('http://www.baidu.com')
    expect($form.attr('methods')).to.be.equal('get')
    expect($form.attr('target')).to.be.equal('_blank')
    expect($form.css('display')).to.be.equal('none')
    expect($input.length).to.be.equal(2)
    expect($input1.attr('name')).to.be.equal('name')
    expect($input1.val()).to.be.equal('lilei')
    expect($input2.attr('name')).to.be.equal('age')
    expect($input2.val()).to.be.equal('12')
  })

  it.skip('表单提交基础带数据 POST 测试: ', function () {
    formSubmit({
      url: 'http://www.baidu.com',
      methods: 'post',
      data: {
        name: 'lilei',
        age: 12
      }
    })

    var $body = $('body')
    var $form = $body.find('form')
    var $input = $form.find('input')
    var $input1 = $input.eq(0)
    var $input2 = $input.eq(1)

    expect($form.length).to.be.equal(1)
    expect($form.attr('action')).to.be.equal('http://www.baidu.com')
    expect($form.attr('methods')).to.be.equal('post')
    expect($form.attr('target')).to.be.equal('_blank')
    expect($form.css('display')).to.be.equal('none')
    expect($input.length).to.be.equal(2)
    expect($input1.attr('name')).to.be.equal('name')
    expect($input1.val()).to.be.equal('lilei')
    expect($input2.attr('name')).to.be.equal('age')
    expect($input2.val()).to.be.equal('12')
  })

})