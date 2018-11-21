
var parser = require('./parser'),
    Quote = require('./quote');
var util = require('./util');
parser.yy = {
    unQuote: Quote.unQuote
};

function walk(holder, name, reviver) {
    var val = holder[name],
        i, len, newElement;

    if (typeof val === 'object') {
        if (util.isArray(val)) {
            i = 0;
            len = val.length;
            var newVal = [];
            while (i < len) {
                newElement = walk(val, String(i), reviver);
                if (newElement !== undefined) {
                    newVal[newVal.length] = newElement;
                }
                i++;
            }
            val = newVal;
        } else {
            var keys = util.keys(val);
            for (i = 0, len = keys.length; i < len; i++) {
                var p = keys[i];
                newElement = walk(val, p, reviver);
                if (newElement === undefined) {
                    delete val[p];
                } else {
                    val[p] = newElement;
                }
            }
        }
    }

    return reviver.call(holder, name, val);
}

module.exports = function (str, reviver) {
    var root = parser.parse(String(str));
    if (reviver) {
        return walk({
            '': root
        }, '', reviver);
    } else {
        return root;
    }
};
