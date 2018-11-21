_.templateSettings = {
    evaluate: /{%([\s\S]+?)%}/g,
    interpolate: /{%=([\s\S]+?)%}/g,
    escape: /{%-([\s\S]+?)%}/g
};
var JSON = require('../utils/json');
var base = require("../utils/base.js");
var baseJs = require("./base.js");
var utils = require('../utils/mini-utils/index.js');
var Publish = require('../utils/Publish.js');
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

function uuid() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }
    return uuid;
}


function bind(fn, ctx, key) {
    return function (a) {
        try {
            var l = arguments.length;
            return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
        } catch (e) {
            var msg = 'el: ' + ctx.el + ' methods: ' + key + ' ';
            e.message = msg + e.message;
            if (ctx.isComponent) {
                e.message = e.message + ' from component'
            }
            throw e;
        }
    };
}

function View(options) {
    // if (!options.el) throw new Error('options element is undefined');
    this.el = options.el;
    if (typeof this.el === 'string' && this.el.split(' ').length > 1) this.isComponent = true;
    this.$el = $(options.el);
    this.$options = options || {};
    this.$refs = {};

    // this.listen = options.listen;
    _.each(['updated', 'ready', 'beforeCreate'], function (option) {
        this[option] = options[option] || new Function();
    }, this);

    this.template = typeof options.template == "function"
        ? options.template()
        : typeof options.template == "string"
            ? options.template : '';
    this.uuid = uuid();
    this.mediator = new Publish();
    this.obDataKey = [];
    this.init();
}


//todo 改成2次合并
View.prototype.utils = utils;
View.prototype.formSubmit = require('./formSubmit.js');
View.prototype.baseJs = baseJs;

$.extend(View.prototype, baseJs, utils, {

    init: function () {
        var that = this;

        //数据拉取机制设定 将以下View配置项代理到View实例上
        _.each(['fetchs', 'methods', 'computed'], function (name) {
            if(!that.$options[name]) return;
            that['$' + name] = function () {
                var bindObject = that.$options[name];
                for (var key in bindObject) {
                    if (bindObject.hasOwnProperty(key)) {
                        that[key] = bind(bindObject[key], that, key);
                        that[key].toString = function () {
                            return bindObject[key].toString();
                        }
                    }
                }
            };
        });

        //对view实例的render进行调度
        try {
            this.beforeCreate();
        } catch (e) {
            e.message = 'el: ' + this.el + ' beforeCreate: ' + e.message;
            throw e
        }
        this.$options.mixins && this.$mixins();
        this.$data();
        this.$computed && this.$computed();
        this.$render();// data复制到this后渲染，渲染时间
        this.mediator.on('render' + this.uuid, that.$render, that); //todo 这里的观察者有问题
        this.$fetchs && this.$fetchs();
        this.$methods && this.$methods();
        this.delegateEvents();
        this.listenEvent();
        this.props();
        setTimeout(function () {
            try {
                that.ready.call(that);
            } catch (e) {
                e.message = 'el: ' + that.el + ' ready: ' + e.message;
                throw e;
            }
            try {
                that.updated.call(that);
            } catch (e) {
                e.message = 'el: ' + that.el + ' updated: ' + e.message;
                throw e;
            }
        }, 200)

    },

    //todo view监听data,跟随渲染,不用耦合在数据请求中

    $data: function () {
        var data = this.$options.data || {};
        if (!this.$newProps) this.$newProps = {}
        for (var key in data) {
            this[key] = data[key];
            this.obDataKey.push(key);
            if (this.isComponent) {
                this.$newProps[key] = data[key];
            }
        }
    },

    $mixins: function () {
        var that = this;
        var mixins = that.$options.mixins;

        if (mixins instanceof Array) {
            _.each(mixins, function (mixin) {
                add(mixin);
            })
        } else {
            add(mixins);
        }

        function add(mixin) {
            if (typeof mixin != 'object') {
                new Error('this mixin no a object,' + mixins);
                return;
            }

            for (var key in mixin) {
                if(_.contains(['data', 'props', 'events', 'methods'],key)){
                    $.extend(that.$options[key], mixin[key]);
                }else{
                    that[key] = bind(mixin[key], that, key);
                }
            }
        }

    },
    delegateEvents: function (events) {

        var events;
        if(!(events = this.$options.events)) return;
        this.undelegateEvents();

        for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this[events[key]];
            if (!method) continue;
            var match = key.match(delegateEventSplitter);
            $(document).off(match[1], match[2]);
            this.delegate(match[1], match[2], this.proxy(method));
        }

    },
    delegate: function (eventName, selector, listener) {
        var that = this;

        function initError () {
            var msg = 'el: ' + that.el;
            msg += ' events: ' + eventName;
            msg += ' target: ' + selector + ' ';
            return msg;
        }

        if (this.isComponent) {
            $(this.$el)
                .off(eventName, selector)
                .on(eventName, selector, function (event) {
                    try {
                        listener.call(this, event)
                    } catch (e) {
                        var msg = initError();
                        e.message = msg + e.message + ' from component';
                        throw e;
                    }
                });

            if (ISTEST) {
                !this.$TEST_EVENT && (this.$TEST_EVENT = {});
                this.$TEST_EVENT[eventName + ' ' + selector] = function () {
                    try {
                        listener.call($(selector)[0], event)
                    } catch (e) {
                        var msg = initError();
                        e.message = msg + e.message + ' from component';
                        throw e;
                    }
                }
            }
        } else {
            $(document)
                .on(eventName + '.delegateEvents' + this.uuid, selector, function (event) {
                    try {
                        listener.call(this, event);
                    } catch (e) {
                        var msg = initError();
                        e.message = msg + e.message;
                        throw e;
                    }
                });

        }
    },
    undelegateEvents: function () {

        if (this.$el) {
            $(document)
                .off('.delegateEvents' + this.uuid);
        }
        return this;

    },
    undelegate: function (eventName, selector, listener) {

        this.$el.off(eventName + '.delegateEvents' + this.uuid, selector, listener);

    },
    proxy: function (cb) {

        var _this = this;
        return function (evt) {
            cb.call(this, _this, evt);
        }

    },

    $repaint: function () {
        this.mediator.trigger('render' + this.uuid);
        if (this.isComponent) {
            try{
                this.$oldProps = JSON.parse(JSON.stringify(this.$newProps));
            }catch(e){
                throw e ;
            }
        }
        try {
            this.updated();
        } catch (e) {
            e.message = 'el: ' + this.el + ' updated in repaint: ' + e.message
            throw e
        }
    },

    $render: function () {
        var that = this;
        this.$el = $(this.el); // 有必要重新获取el
        // console.log('$render0',that.$el[0],that.$el.html)
        try {
            that.$el.html(_.template(that.template)(that));
        } catch (e) {
            e.message = 'el: ' + that.el + ' render: template is error ' + e.message;
            // console.log('$render',e)
            throw e;
        }
        if(that.$options.components) that.$components();
    },
    $on: function (fn, data) {
        this.mediator.on(fn + this.uuid, data)
    },
    $emit: function (fn, data) {
        this.mediator.trigger(fn + this.uuid, data);
    },
    $set: function (key, val) {
        if (typeof key === 'function') {
            key.call(this)
        } else {
            this[key] = val;
        }
        this.$obComputed();
    },
    $obComputed: function () {
        var that = this;
        if (this.isComponent) {
        } else {
            // 将监听的值, 赋值给子元素
            _.each(this.obDataKey, function (key) {
                _.each(that.$refs, function ($vm) {
                    _.each($vm._props, function (value, k) {
                        if (value === key) {
                            $vm.$newProps[k] = that[key];
                            $vm[k] = that[key];
                        }
                    });
                    $vm.$componentsRender();
                })
            })
        }
    },
    $componentsRender: function () {
        if (JSON.stringify(this.$newProps) !== JSON.stringify(this.$oldProps) && this.isComponent) {
            this.$repaint();
        } else {
            this.$obComputed();
        }
    },
    $components: function () {
        var components = this.$options.components;
        for (var key in components) {
            this.$componentsInit(key, components[key])
        }
    },
    //
    $componentsInit: function (key, component) {
        var $vm;
        console.log('this',this)
        component.component.el = this.el + ' .' + key;
        this.propsBefore(component.component, component.props);
        try {
            $vm = new View(component.component);
        } catch (e) {
            e.message = e.message + ' from component'
            throw e
        }
        $vm.$parent = this;
        this.propsAfter($vm, component);
        this.onHandle($vm, component.on);
        this.$refs[key] = $vm;
    },
    // props预处理
    propsBefore: function (component, props) {
        if (!props) {
            return false;
        }
        if (!component.data) component.data = {}
        for (var key in props) {
            component.data[key] = this[props[key]];
        }
    },
    // props后处理
    propsAfter: function ($vm, component) {
        var props = component.props;
        if (!props) {
            return false;
        }
        $vm._props = props;
    },
    // 事件处理
    onHandle: function ($vm, $on) {
        for (var key in $on) {
            $vm.$on(key, (function (key) {
                return function (data) {
                    $on[key].call($vm.$parent, data);
                }
            })(key));
        }
    },

    listenEvent: function () {
        var _this = this;
        var fn = this.$options.listenEvent;
        for (var key in fn) {
            this.$on(key, bind(fn[key], _this, key))
        }
    },
    props: function () {

    }
});

window.View = View;
module.exports = View;






