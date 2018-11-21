//  断言库
var expect = require('chai').expect;

var _ = require('../test-libs/underscore')
var $ = require('../test-libs/jquery')

window._ = _
window.$ = $

var View = require('../../src/view/index.js')

describe('View: ', function () {
  this.timeout(4000)

  beforeEach(function () {
    // 清空数据
    $('body').html('<div id="J_view"></div>')
  })
  
  it('view: el', function () {
    var vm = new View({
      el: '#J_view'
    })
    expect(vm.$el[0]).to.be.equal($('#J_view')[0])
  })

  it('view: template', function () {
    var vm = new View({
      el: '#J_view',
      template: '<p>Hello {%=msg%}</p>',
      data: {
        msg: 'World!'
      }
    })
    var $el = $('#J_view')
    var $p = $el.find('p')

    expect(vm.$el.find('p')[0]).to.be.equal($p[0])
    expect(vm.$el.find('p').text()).to.be.equal($p.text())
    expect($p.text()).to.be.equal('Hello World!')
  })

  it('view: render', function () {
    var vm = new View({
      el: '#J_view',
      template: '<p>Hello {%=msg%}</p>',
      data: {
        msg: 'World!'
      }
    })


    var $el = $('#J_view')

    expect($el.find('p').text()).to.be.equal('Hello World!')

    vm.msg = 'WSLOAN!'
    vm.$render()
    expect($el.find('p').text()).to.be.equal('Hello WSLOAN!')
  })

  it('view: repaint', function () {
    var vm = new View({
      el: '#J_view',
      template: '<p>Hello {%=msg%}</p>',
      data: {
        msg: 'World!'
      }
    })

    var $el = $('#J_view')

    expect($el.find('p').text()).to.be.equal('Hello World!')

    vm.msg = 'WSLOAN!'
    vm.$repaint()
    expect($el.find('p').text()).to.be.equal('Hello WSLOAN!');

  })

  it('view: template catch error', function () {
    function exec () {
      var vm = new View({
        el: '#J_view',
        template: '<p>Hello{%if(can){% heiheihei{% } %}</p>',
        data: {
          can: true ,
          msg: 'World!'
        }
      })
    }

    var $el = $('#J_view')
    expect(exec).to.throw(Error, /el: #J_view render: template is error/)
  })

  it('view: template if', function () {
    var vm = new View({
      el: '#J_view',
      data: {
        show: false
      },
      template: require('./template/if.html')
    })

    expect($('body p').length).to.be.equal(0)

    vm.show = true
    vm.$repaint()

    expect($('body p').length).to.be.equal(1)
  })

  it('view: template if else', function () {
    var vm = new View({
      el: '#J_view',
      data: {
        show: false
      },
      template: require('./template/if-else.html')
    })

    expect($('body p').length).to.equal(1)
    expect($('body p').text()).to.equal('Hello WSLOAN!')

    vm.show = true
    vm.$repaint()

    expect($('body p').length).to.equal(1)
    expect($('body p').text()).to.equal('Hello World!')
  })

  it('view: template each', function () {
    var items = [
      {name: 'LiLei'},
      {name: 'HanMei'},
      {name: 'Lucy'},
      {name: 'Lily'}
    ]

    var vm = new View({
      el: '#J_view',
      data: {items: items},
      template: require('./template/each.html')
    })

    var $body = $('body')
    expect($body.find('li').length).to.equal(4)

    var $lis = $('li')
    $.each(items, function (index, item) {
      expect($lis.eq(index).text()).to.equal(index + ': ' + item.name)
    })
  })

  it('view: computed', function () {
    var vm = new View ({
      el: '#J_view',
      data: {
        first: 'Hello',
        last: 'World!'
      },
      template: '<p>{%=msg()%}</p>',
      computed: {
        msg: function () {
          return this.first + ' ' + this.last
        }
      }
    })

    expect($('#J_view p').text()).to.be.equal('Hello World!')

    vm.last = 'WSLOAN!'
    vm.$render()
    expect($('#J_view p').text()).to.be.equal('Hello WSLOAN!')

    vm.last = 'World!'
    vm.$repaint()
    expect($('#J_view p').text()).to.be.equal('Hello World!')

  })

  it('view: methods', function () {
    var num = 0
    var vm = new View({
      el: '#J_view',
      methods: {
        add: function () {
          num++
        },
        dec: function () {
          num--
        }
      }
    })

    vm.add()
    expect(num).to.be.equal(1)
    vm.add()
    vm.add()
    vm.dec()
    expect(num).to.be.equal(2)
  })
  // methods 传参测试
  it('view: methods params', function () {
    var num = 0;
    var vm = new View({
      el: '#J_view',
      methods: {
        add: function (m, n) {
          num = num + m + (n || 0)
        },
        dec: function (m, n, l) {
          num = num - m - (n || 0) - (l || 0)
        }
      }
    })

    vm.add(2)
    expect(num).to.equal(2)
    vm.add(4, 6)
    // 多参数
    expect(num).to.equal(12)

    vm.dec(2)
    expect(num).to.equal(10)
    vm.dec(1, 3, 5)
    expect(num).to.equal(1)

  })
  // 显示 方法
  it('view: methods toString', function () {
    var vm = new View({
      el: '#J_view',
      methods: {
        add: function () {
          console.log('i am in methods')
        }
      }
    })

    expect(vm.add.toString()).to.be.contains('i am in methods')
      .to.be.contains('console.log')
  })

  it('view: methods catch error', function () {
    var vm = new View({
      el: '#J_view',
      methods: {
        test: function () {
          throw new Error('错误');
        }
      }
    })
    // 能抓取到报错的el 和 方法名
    expect(vm.test).to.throw(Error, 'el: #J_view methods: test 错误')
  })

  it('view: fetchs', function (done) {
    var vm = new View({
      el: '#J_view',
      fetchs: {
        // http://www.wsloan.com/APPapi/api.ashx?callback=time&q=serverTime
        getTime: function () {
          this.ajax({
            url: 'http://www.wsloan.com/APPapi/api.ashx?q=serverTime',
            success: function (data) {
              expect(data.code).to.be.equal(1)
              done()
            }
          })
        }
      }
    })

    vm.getTime()
  })

  it('view: events', function () {
    var $vm = undefined
    var btn = undefined
    var event = undefined
    var num = 0
    var vm = new View({
      el: '#J_view',
      template: '<button class="J_button">点击</button>',
      events: {
        'click .J_button': function (vm, e) {
          btn = this
          $vm = vm
          vm.test(1)
          event = e
        }
      },
      methods: {
        test: function (n) {
          num = n
        }
      }
    })

    $('#J_view button').trigger('click')
    // 第一个参数为 vm 自身
    expect(vm).to.be.equal($vm)
    // events方法内的上下文 是 选择器本身
    expect($('.J_button')[0]).to.be.equal(btn)
    expect(event).to.be.an('object')
    // 判断是否属于jquery 的event
    expect(event instanceof $.Event).to.be.true
    expect(num).to.be.equal(1)
  })

  it('view: events 不能重复绑定', function () {
    var num = 0
    var vm = new View({
      el: '#J_view',
      template: '<button class="J_button">点击</button>',
      events: {
        'click .J_button': function (vm) {
          num++
        }
      }
    })
    $('#J_view button').trigger('click')
    var vm = new View({
      el: '#J_view',
      template: '<button class="J_button">点击</button>',
      events: {
        'click .J_button': function (vm) {
          num++
        }
      }
    })

    $('#J_view button').trigger('click')
    expect(num).to.be.equal(2)
  })

  it('view: events 不同vm, 绑定事件不影响其它', function () {
    $('#J_view').append('<div id="J_view1"></div><div id="J_view2"></div>')
    // 先判断是否有两个DOM
    expect($('#J_view div').length).to.equal(2)

    var num = 0;
    function exec (el) {
      return new View({
        el: el,
        template: '<div class="btn"></div>',
        events: {
          'click .btn': function () {
            num ++
          }
        }
      })
    }
    var vm1 = exec('#J_view1')
    var vm2 = exec('#J_view2')

    $('#J_view1 .btn').trigger('click')
    expect(num).to.equal(1)

    $('#J_view2 .btn').trigger('click')
    expect(num).to.equal(2)
  })

  it('view: events catch error', function () {
    new View({
      el: '#J_view',
      template: '<div class="btn"></btn>',
      events: {
        'click .btn': function () {
          throw new Error('错误')
        }
      }
    })

    function click () {
      $('body .btn').trigger('click')
    }
    expect(click).to.throw(Error, 'el: #J_view events: click target: .btn 错误')
  })

  // 生命周期
  it('view: lifecycle', function (done) {
    var ready_num = 0
    var updated_num = 0
    var before_num = 0
    var vm = new View({
      el: '#J_view',
      beforeCreate: function () {
        before_num ++
      },
      ready: function () {
        ready_num ++
      },
      updated: function() {
        updated_num ++
      }
    })
    setTimeout(function () {
      expect(before_num).to.be.equal(1)
      expect(ready_num).to.be.equal(1)
      expect(updated_num).to.be.equal(1)
      vm.$render()
      setTimeout(function () {
        expect(before_num).to.be.equal(1)
        expect(ready_num).to.be.equal(1)
        expect(updated_num).to.be.equal(1)
        // console.log(before_num, ready_num, updated_num)
        vm.$repaint()
        setTimeout(function () {
          expect(before_num).to.be.equal(1)
          expect(ready_num).to.be.equal(1)
          // $repaint后, 触发 updated
          expect(updated_num).to.be.equal(2)
          done()
        })
      }, 300)
    }, 300)
  })

  // beforeCreate 抓取错误
  it('view: beforeCreate catch error', function () {
    function beforeCreate () {
      var vm = new View({
        el: '#J_view',
        beforeCreate: function () {
          throw new Error('报错')
        }
      })
    }

    expect(beforeCreate).to.throw(Error, 'el: #J_view beforeCreate: 报错')
  })
// =================================================
  /**
   * TODO: 这个目前还不知道怎么测试 ready 和 updated 这两个异步方法..
   * 因此这里测试时需要注释 view 里的异步方法
   */
  // ready 抓取错误
  it.skip('view: ready catch error', function () {
    function ready () {
      var vm = new View({
        el: '#J_view',
        ready: function () {
          throw new Error('报错')
        }
      })
    }

    expect(ready).to.throw(Error, 'el: #J_view ready: 报错')
  })

  // updated 抓取错误
  it.skip('view: updated catch error', function () {
    function updated () {
      var vm = new View({
        el: '#J_view',
        updated: function () {
          throw new Error('报错')
        }
      })
    }

    expect(updated).to.throw(Error, 'el: #J_view updated: 报错')
  })
// =================================================
  // 重绘后 报错
  it('view: updated catch error in repaint', function (done) {
    var isError = false
    var vm = new View({
      el: '#J_view',
      updated: function () {
        if (isError) {
          throw new Error('报错')
        }
      }
    })
    setTimeout(function () {
      function updated () {
        isError = true
        vm.$repaint()
      }
      
      expect(updated).to.throw(Error, 'el: #J_view updated in repaint: 报错')
      done()
    }, 300)
  })

  it('view: mixins', function () {
    var age = 18
    var name = 'LiLei'

    var mixins = {
      data: {
        age: age
      },
      events: {
        'click .J_mixins_verify': function ($vm, event) {
          expect(this).to.be.equal($('body .J_mixins_verify')[0])
          expect(event instanceof $.Event).to.be.true
          expect($vm).to.be.equal(vm)

          expect($vm.getAge()).to.be.equal(age)
          expect($vm.getName()).to.be.equal(name)
        }
      },
      methods: {
        getAge: function () {
          return this.age
        }
      }
    }

    var vm = new View({
      el: '#J_view',
      data: {
        name: name
      },
      mixins: [mixins],
      template: '<div class="J_mixins_verify"></div><div class="J_verify"></div>',
      events: {
        'click .J_verify': function ($vm, evetn) {
          expect($vm.getAge()).to.be.equal(age)
          expect($vm.getName()).to.be.equal(name)
        }
      },
      methods: {
        getName: function () {
          return this.name
        }
      }
    })

    $('#J_view .J_verify').trigger('click')
    $('#J_view .J_mixins_verify').trigger('click')

  })

  it('view: components', function () {
    var isTriggerInComponentEvent = false
    var isTriggerInComponentMethods = false
    var button = undefined

    var component = {
      template: '<button class="button">{%=msg%}</button>',
      events: {
        'click .button': function ($vm, event) {
          var a = 1
          $vm.$emit('add', a)
          $vm.add(true)
          isTriggerInComponentEvent = true

          expect(event instanceof $.Event).to.be.true
          expect($vm).to.be.equal(vm.$refs.btn)
          button = this
        }
      },
      methods: {
        add: function (bool) {
          isTriggerInComponentMethods = bool
        }
      }
    }

    var vm = new View({
      el: '#J_view',
      data: {
        num: 0
      },
      template: '<div class="btn"></div>',
      components: {
        btn: {
          component: component,
          props: {
            msg: 'num'
          },
          on: {
            add: function (num) {
              this.$set(function () {
                this.num = this.num + num
              })
            }
          }
        }
      }
    })

    expect($('#J_view .button').length).to.be.equal(1)
    expect($('button').text()).to.be.equal('0')
    expect(vm.num).to.be.equal(0)

    expect(vm.$refs.btn.isComponent).to.be.true

    expect(isTriggerInComponentEvent).to.be.false
    expect(isTriggerInComponentMethods).to.be.false


    $('#J_view .button').trigger('click')

    expect($('button').text()).to.be.equal('1')

    expect(isTriggerInComponentEvent).to.be.true
    expect(isTriggerInComponentMethods).to.be.true


    expect(vm.num).to.be.equal(1)

    expect(button.tagName).to.be.equal($('.button')[0].tagName)

  })

  it('view: components catch template error', function () {
    var component = {
      template: '<p>{%=msg%}</p>'
    }
    function exec () {
      var vm = new View({
        el: '#J_view',
        template: '<div class="test"></div>',
        data: {msg: 'Hello'},
        components: {
          test: {
            component: component
          }
        }
      })
    }

    expect(exec).to.throw(Error, 'el: #J_view .test render: template is error msg is not defined from component')
  })

  it('view: components catch events error', function () {
    var component = {
      template: '<p class="btn">点击</p>',
      events: {
        'click .btn': function () {
          throw new Error('错误')
        }
      }
    }

    var vm = new View({
      el: '#J_view',
      template: '<div class="test"></div>',
      components: {
        test: {
          component: component
        }
      }
    })

    function exec () {
      $('.btn').trigger('click')
    }

    expect(exec).to.throw(Error, 'el: #J_view .test events: click target: .btn 错误 from component')
  })

  it('view: components catch methods error', function () {
    var component = {
      template: '<p class="btn">点击</p>',
      methods: {
        test: function () {
          throw new Error('错误')
        }
      }
    }

    var vm = new View({
      el: '#J_view',
      template: '<div class="test"></div>',
      components: {
        test: {
          component: component
        }
      }
    })

    expect(vm.$refs.test.test).to.throw(Error, 'el: #J_view .test methods: test 错误 from component')
  })

  it('view: components render after parent data mutation', function () {
    var component = {
      template: '<p class="btn">{%=msg%}</p>'
    }

    var vm = new View({
      el: '#J_view',
      template: '<div class="test"></div>',
      data: {
        msg: 'Hello World!'
      },
      components: {
        test: {
          component: component,
          props: {
            msg: 'msg'
          }
        }
      }
    })
    expect($('.test').text())
      .to.be.equal('Hello World!')
    vm.$set(function () {
      this.msg = 'Hello WSLOAN!'
    })
    expect($('.test').text())
      .to.be.equal('Hello WSLOAN!')

  })

  it('view: 完整测试', function () {
  })


})
