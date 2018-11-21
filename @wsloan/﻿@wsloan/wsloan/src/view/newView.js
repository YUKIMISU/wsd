/**
 * Created by chenhm on 25/08/2017.
 */
var configBase = require('../config/base');
require('./ieBetter');
var html2elementTree = require('./html2elementTree');
var svd = require('../libs/simple-virtual-dom');
var diff = svd.diff
var patch = svd.patch
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
var vueTemplate = require('./vueTplEngine');
var Publish = require('../utils/Publish.js');
var utils = require('../utils/mini-utils/index.js');
var base = require("../utils/base.js");
var baseJs = require("./base.js");



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
            throw e;
        }
    };
}

function newView(options) {
    // if (!options.el) throw new Error('options element is undefined');
    this.el = options.el;
    this.$el = $(options.el);
    this.$options = options || {};
    this.$refs = {};

    _.each(['updated', 'ready', 'beforeCreate'], function (option) {
        this[option] = options[option] || new Function();
    }, this);

    this.template = typeof options.template == "function"
        ? options.template()
        : typeof options.template == "string"
            ? options.template : '';
    this.uuid = uuid();
    this.mediator = new Publish();
    this.init();
}

//todo 改成2次合并
newView.prototype.utils = utils;
newView.prototype.formSubmit = require('./formSubmit.js');
newView.prototype.baseJs = baseJs;

$.extend(newView.prototype,baseJs,utils, {

    init: function () {
        var that = this;

        //将methods和计算属性挂载到View实例上供钩子函数调用
        _.each([ 'methods', 'computed'], function (name) {
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
            this.beforeCreate && this.beforeCreate();
        } catch (e) {
            e.message = 'el: ' + this.el + ' beforeCreate: ' + e.message;
            throw e
        }
        this.$options.mixins && this.$mixins();
        //将所有需要用到的值挂在实例上,供钩子函数调用
        this.$data();

        this.props();
        this.$computed && this.$computed();
        this.$methods && this.$methods();
        this.$render();// data复制到this后渲染，渲染时间
        this.mediator.on('render' + this.uuid, that.$render, that); //todo 这里的观察者有问题
        this.delegateEvents();
    },

    $data: function () {
        var data = this.$options.data || {};
        for (var key in data) {
            this[key] = data[key];
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

        for (var key in events) {
            var method = events[key];
            if (!method) continue;
            if (!_.isFunction(method)) method = this[events[key]];
            var match = key.match(delegateEventSplitter);
            this.delegate(match[1], match[2], this.proxy(method));
        }

    },
    delegate: function (eventName, selector, listener) {
        var that = this;

        $(document)
            .off(eventName, selector)

        $(document)
            .on(eventName, selector, function (event) {
                try {
                    listener.call(this, event);
                } catch (e) {
                    throw e;
                }
            });
    },
    proxy: function (cb) {
        var _this = this;
        return function (evt) {
            cb.call(this, _this, evt);
        }
    },

    $repaint: function () {
        this.mediator.trigger('render' + this.uuid);
        try {
            this.update && this.updated();
        } catch (e) {
            e.message = 'el: ' + this.el + ' updated in repaint: ' + e.message
            throw e
        }
    },

    $render: function () {
        var that = this;
        that.$el = $(that.el);
        if(that.$el.length >0){
            // console.log('template',that.template)
            var tempStr = vueTemplate(that.template,that);
            // console.log('tempStr',tempStr)
            if(tempStr !== that._oldStr){
                if(!that._tree){
                    that._tree = html2elementTree(tempStr);
                    that._root = that._tree.render();
                    if(navigator.appName === "Microsoft Internet Explorer" && parseInt($.browser.version,10) < 8){
                        //IE7 domrender兼容性处理
                        that.$el.html(tempStr);
                    }else{
                        that.$el.html(that._root);
                    }
                    that.ready.call(that);
                    that.$options.components.call(this);
                }else{
                    var newTree = html2elementTree(tempStr);
                    if(navigator.appName === "Microsoft Internet Explorer" && parseInt($.browser.version,10) < 8){
                        //IE7 domrender兼容性处理
                        that.$el.html(tempStr);
                    }else{
                        patch(that._root, diff(that._tree, newTree));
                    }
                    that._tree = newTree
                }
                that._oldStr = tempStr;
            }
        }else{
            //当对象被清空后,相关数据也要被清空,不然会导致下一次渲染
            that._oldStr = '';
            that._tree = '';
        }
    },
    $on: function (fn, data) {
        this.mediator.on(fn + this.uuid, data)
    },
    $emit: function (fn, data) {
        this.mediator.trigger(fn + this.uuid, data);
    },
    props: function () {
        var data = this.$options.props || [];
        data.forEach(function(key){
            this[key] = this[key] || '';
        })
    }
});
window.newView = newView;
