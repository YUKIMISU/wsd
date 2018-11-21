var guid = 0,
    EMPTY = '';
var class2type = {},
    TRUE = true,
    FALSE = false,
    undef,
    OP = Object.prototype,
    toString = OP.toString;
var
    AP = Array.prototype,
    indexOf = AP.indexOf,
    lastIndexOf = AP.lastIndexOf,
    filter = AP.filter,
    every = AP.every,
    some = AP.some,
    map = AP.map;


function hasOwnProperty(o, p) {
    return OP.hasOwnProperty.call(o, p);
}

var base = {

    noop: function() {
    },

    mix: function(to,from) {
        for(var key in from) {
            to[key] = from[key];
            /*if ( !!to[key] ) {
                // throw new Error('属性名重复');
            }else{
                to[key] = from[key];
            }*/
        }
        return to;
    },
    guid: function(pre) {
        return (pre || EMPTY) + guid++;
    },
    type: function(o) {
        return o == null ?
            String(o) :
            class2type[toString.call(o)] || 'object';
    },
    has: function(obj, key) {
        return obj != null && hasOwnProperty(obj, key);
    },
    isEmptyObject: function(o) {
        for(var p in o) {
            if(p !== undef) {
                return false;
            }
        }
        return true;
    },
    isPlainObject: function(obj) {

        if(!obj || base.type(obj) !== 'object' || obj.nodeType || obj.window == obj) {
            return FALSE;
        }

        var key, objConstructor;

        try {
            // Not own constructor property must be Object
            if((objConstructor = obj.constructor) && !hasOwnProperty(obj, 'constructor') && !hasOwnProperty(objConstructor.prototype, 'isPrototypeOf')) {
                return FALSE;
            }
        } catch(e) {
            // IE8,9 Will throw exceptions on certain host objects
            return FALSE;
        }
        for(key in obj) {
        }

        return ((key === undef) || hasOwnProperty(obj, key));
    },
    indexOf: indexOf ?
        function(item, arr, fromIndex) {
            return fromIndex === undef ?
                indexOf.call(arr, item) :
                indexOf.call(arr, item, fromIndex);
        } :
        function(item, arr, fromIndex) {
            for(var i = fromIndex || 0, len = arr.length; i < len; ++i) {
                if(arr[i] === item) {
                    return i;
                }
            }
            return -1;
        },


    lastIndexOf: (lastIndexOf) ?
        function(item, arr, fromIndex) {
            return fromIndex === undef ?
                lastIndexOf.call(arr, item) :
                lastIndexOf.call(arr, item, fromIndex);
        } :
        function(item, arr, fromIndex) {
            if(fromIndex === undef) {
                fromIndex = arr.length - 1;
            }
            for(var i = fromIndex; i >= 0; i--) {
                if(arr[i] === item) {
                    break;
                }
            }
            return i;
        },


    unique: function(a, override) {
        var b = a.slice();
        if(override) {
            b.reverse();
        }
        var i = 0,
            n,
            item;

        while(i < b.length) {
            item = b[i];
            while((n = base.lastIndexOf(item, b)) !== i) {
                b.splice(n, 1);
            }
            i += 1;
        }

        if(override) {
            b.reverse();
        }
        return b;
    },


    inArray: function(item, arr) {
        return base.indexOf(item, arr) > -1;
    },


    filter: filter ?
        function(arr, fn, context) {
            return filter.call(arr, fn, context || this);
        } :
        function(arr, fn, context) {
            var ret = [];
            base.each(arr, function(item, i, arr) {
                if(fn.call(context || this, item, i, arr)) {
                    ret.push(item);
                }
            });
            return ret;
        },


    map: map ?
        function(arr, fn, context) {
            return map.call(arr, fn, context || this);
        } :
        function(arr, fn, context) {
            var len = arr.length,
                res = new Array(len);
            for(var i = 0; i < len; i++) {
                var el = base.type(arr) === 'string' ? arr.charAt(i) : arr[i];
                if(el ||
                    //ie<9 in invalid when typeof arr == string
                    i in arr) {
                    res[i] = fn.call(context || this, el, i, arr);
                }
            }
            return res;
        },


    reduce: function(arr, callback, initialValue) {
        var len = arr.length;
        if(base.type(callback) !== 'function') {
            throw new TypeError('callback is not function!');
        }

        // no value to return if no initial value and an empty array
        if(len === 0 && arguments.length === 2) {
            throw new TypeError('arguments invalid');
        }

        var k = 0;
        var accumulator;
        if(arguments.length >= 3) {
            accumulator = initialValue;
        } else {
            do {
                if(k in arr) {
                    accumulator = arr[k++];
                    break;
                }

                // if array contains no values, no initial value to return
                k += 1;
                if(k >= len) {
                    throw new TypeError();
                }
            }
            while(TRUE);
        }

        while(k < len) {
            if(k in arr) {
                accumulator = callback.call(undef, accumulator, arr[k], k, arr);
            }
            k++;
        }

        return accumulator;
    },


    every: every ?
        function(arr, fn, context) {
            return every.call(arr, fn, context || this);
        } :
        function(arr, fn, context) {
            var len = arr && arr.length || 0;
            for(var i = 0; i < len; i++) {
                if(i in arr && !fn.call(context, arr[i], i, arr)) {
                    return FALSE;
                }
            }
            return TRUE;
        },


    some: some ?
        function(arr, fn, context) {
            return some.call(arr, fn, context || this);
        } :
        function(arr, fn, context) {
            var len = arr && arr.length || 0;
            for(var i = 0; i < len; i++) {
                if(i in arr && fn.call(context, arr[i], i, arr)) {
                    return TRUE;
                }
            }
            return FALSE;
        },

    makeArray: function(o) {
        if(o == null) {
            return [];
        }
        if(base.isArray(o)) {
            return o;
        }
        var lengthType = base.type(o.length),
            oType = base.type(o);
        if(lengthType !== 'number' ||
            base.type(o.nodeName) === 'string' ||
            (o != null && o == o.window) ||
            oType === 'string' ||
            (oType === 'function' && !('item' in o && lengthType === 'number'))) {
            return [o];
        }
        var ret = [];
        for(var i = 0, l = o.length; i < l; i++) {
            ret[i] = o[i];
        }
        return ret;
    }
};


var types = 'Boolean Number String Function Date RegExp Object Array Null Undefined'.split(' ');
for(var i = 0; i < types.length; i++) {
    (function(name, lc) {
        class2type['[object ' + name + ']'] = (lc = name.toLowerCase());

        base['is' + name] = function(o) {
            return base.type(o) === lc;
        };
    })(types[i], i);
}

base.isArray = Array.isArray || base.isArray;


module.exports = {
    Base: base
};
