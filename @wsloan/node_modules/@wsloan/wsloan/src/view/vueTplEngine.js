/**
 * Created by chenhm on 25/08/2017.
 */
"use strict";

/**
 * Created by chenhm on 26/07/2017.
 */
var vClassDirect = /(?:v-bind)?:class/;
var vForDirect = /v-for/;
var vShowDirect = /v-show/;
var vIfDirect = /v-if/;
var vHtmlDirect = /v-html/;
var vBindDirect = /(?:v-bind)?:/;
var vOnDirect = /v-on:/;
var innerFilter = /{{.*?}}|[^{}]+/g;

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:@][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var attr = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

//转义
var _escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

//需要转义的内容
var _badChars = /[&<>"'`=]/g;

function engine(html, data) {

    var reg = /(<[^>]+>)/g,
        code = 'var r=[];',
        cursor = 0,
        match = void 0,
        bufArray = [];

    var add = function add(line, isTag) {
        if (isTag) {
            if (line.indexOf("</") === 0) {
                var stackEl = bufArray.shift();
                if (stackEl.isHtml) code += "r.push(" + stackEl.htmlQuote + ");";
                code += "r.push(\"" + line.replace(/"/g, '\\"') + "\");";
                if (stackEl.isFor) code += "}";
                if (stackEl.isIf) code += "}";
            } else if (line.indexOf("<") === 0) {
                var temporaryCode = '';
                var quote = null;

                line.replace(startTag, function (match, tagName, rest, unary) {
                    tagName = tagName.toLowerCase();

                    unary = empty[tagName] || !!unary;

                    temporaryCode += "r.push(\"<" + tagName + "\");";

                    rest.replace(attr, function (match, name) {
                        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

                        if (vClassDirect.test(name)) {
                            temporaryCode += "r.push(\" class='\"," + value + ",\"'\");";
                        } else if (vForDirect.test(name)) {
                            value.replace(/(.*)\s+in\s+(.*)/, function (match, s1, s2) {
                                if (s1.indexOf(',') > 0) {
                                    var param = s1.replace(/\(|\)/g, '').split(',');
                                    // temporaryCode = "for(let [" + param[1] + ", " + param[0] + "] of this." + s2 + ".entries()){" + temporaryCode;
                                    temporaryCode = "\n  for(var "+s2.replace(/(\[|\]|\.)/g,'')+"Idx = 0;"+s2.replace(/(\[|\]|\.)/g,'')+"Idx <" + s2 + ".length;"+s2.replace(/(\[|\]|\.)/g,'')+"Idx ++){\n    var " + param[0] + " = " + s2 + "["+s2.replace(/(\[|\]|\.)/g,'')+"Idx];var "+param[1]+" = "+s2.replace(/(\[|\]|\.)/g,'')+"Idx ;\n" + temporaryCode;
                                } else {
                                    // temporaryCode = "for(let " + s1 + " of " + s2 + "){" + temporaryCode;
                                    temporaryCode = "\n  for(var "+s2.replace(/(\[|\]|\.)/g,'')+"Idx  = 0; "+s2.replace(/(\[|\]|\.)/g,'')+"Idx <" + s2 + ".length; "+s2.replace(/(\[|\]|\.)/g,'')+"Idx ++){\n    var " + s1 + " = " + s2 + "["+s2.replace(/(\[|\]|\.)/g,'')+"Idx];\n" + temporaryCode;
                                }
                            });
                        } else if (vIfDirect.test(name)) {
                            code += "\n                                if(" + value + "){\n                            ";
                        } else if (vShowDirect.test(name)) {
                            temporaryCode += "\n                       if(!(" + value + ")){\n                                    r.push(\" style=display:none\")\n                                }\n                            ";
                        } else if (vHtmlDirect.test(name)) {
                            quote = value;
                        } else if (vOnDirect.test(name)) {
                            value.replace(/(\w*?)\((.*?)\)/, function (match, handle, param) {
                                temporaryCode += "r.push(\" " + name + "=\",\"" + handle + "(" + param + ")\");";
                            });
                        } else {
                            if (vBindDirect.test(name)) {
                                temporaryCode += "r.push(\" " + name.substring(name.indexOf(':') + 1) + "='\"," + value + ",\"'\");";
                            } else {
                                temporaryCode += "r.push(\" " + name + "='\",\"" + value + "\",\"'\");";
                            }
                        }
                    });

                    code += temporaryCode;
                    if (unary && (vForDirect.test(line)||vIfDirect.test(line))) {
                        code += "r.push(\">\");}";
                    }else if(unary){
                        code += "r.push(\">\");";
                    }else {
                        code += "r.push(\">\");";
                        bufArray.unshift({
                            tag: tagName,
                            isFor: vForDirect.test(line),
                            isIf: vIfDirect.test(line),
                            isHtml: vHtmlDirect.test(line),
                            htmlQuote: quote
                        });
                    }
                });
            }
        } else {
            line = line.trim();
            line.replace(innerFilter, function (match) {
                if (match.indexOf('{{') === 0) {
                    match.replace(/{{(.*)}}/, function (match2, inner) {
                        code += "r.push(_escapeExpression(" + inner + "));";
                    });
                } else {
                    code += "r.push(\"" + match + "\");";
                }
            });
        }
        return add;
    };

    while (match = reg.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';

    data._escape = _escape;
    data._escapeChar = _escapeChar;
    data._escapeExpression = _escapeExpression;

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            code = "var " + key + " = this['" + key + "'];" + code;
        }
    }
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

function makeMap(str) {
    var obj = {};
    var items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function _escapeChar(chr) {
    return _escape[chr];
}

function _escapeExpression(string) {
    if (typeof string !== 'string') {
        return string;
    }
    if (!_badChars.test(string)) {
        return string;
    }
    return string.replace(_badChars, _escapeChar);
}

module.exports = engine;