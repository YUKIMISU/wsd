var util = require('./base');
var undef;
// IE doesn't include non-breaking-space (0xa0) in their \s character
// class (as required by section 7.2 of the ECMAScript spec), we explicitly
// include it in the regexp to enforce consistent cross-browser behavior.
var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
    EMPTY = '';

var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
    trim = String.prototype.trim;

var RE_DASH = /-([a-z])/ig;

function upperCase() {
    return arguments[1].toUpperCase();
}


var stringUtil = {

    startsWith: function(str, prefix) {
        return str.lastIndexOf(prefix, 0) === 0;
    },

    endsWith: function(str, suffix) {
        var ind = str.length - suffix.length;
        return ind >= 0 && str.indexOf(suffix, ind) === ind;
    },
    trim: trim ?
        function(str) {
            return str == null ? EMPTY : trim.call(str);
        } :
        function(str) {
            return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY);
        },
    urlEncode: function(s) {
        return encodeURIComponent(String(s));
    },


    urlDecode: function(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    },

    camelCase: function(name) {
        if(name.indexOf('-') === -1) {
            return name;
        }
        return name.replace(RE_DASH, upperCase);
    },
    /**
     * Substitutes keywords in a string using an object/array.
     * Removes undef keywords and ignores escaped keywords.
     * @param {String} str template string
     * @param {Object} o json data
     * @member util
     * @param {RegExp} [regexp] to match a piece of template string
     */
    substitute: function(str, o, regexp) {
        if(util.Base.type(str) !== 'string' || !o) {
            return str;
        }

        return str.replace(regexp || SUBSTITUTE_REG, function(match, name) {


            if(match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return (o[name] === undef) ? EMPTY : o[name];
        });
    },
    ucfirst: function(s) {
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    }
};
util.Base.mix(util, {
    Literal: stringUtil
});
