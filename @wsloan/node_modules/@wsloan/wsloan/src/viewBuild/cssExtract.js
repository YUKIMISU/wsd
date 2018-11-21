/**
 * 1、提取css信息 2、是否生成模块化的css
 * Created by chenhm on 07/08/2017.
 */

const fs = require('fs');

const path = require('path');
const beautify = require('js-beautify').css_beautify;

function extract(filepath,content, isModule, lang) {
    let $style = '';

    if (isModule) {
        $style = uuid();
    }


    content = content.replace(/\((\.{1,2}\/)/g,function (match,s) {
        return "(../" + s;
    })

    content = content.replace(/(['"])(\.{1,2}\/)/g,function (match,head,s) {
        return head+"../" + s;
    })

    // fs.writeFileSync(path.dirname(__filename) + '/dist/' + fileName + '.' + (lang ? lang : 'css'), cssHandler(content, $style));
    fs.writeFileSync(filepath + '.' + (lang ? 'scss' : 'css'), beautify(content));
    // console.log(filepath+"."+(lang ? 'scss' : 'css')+"文件已生成");

    return $style;
}



function uuid() {
    let i, random;
    let uuid = '';

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

function cssHandler (data, uuid) {
    const result = sass.renderSync({
        data
    })
    const cssObj = css.parse(result.css.toString(), {});
    cssObj.stylesheet.rules = cssObj.stylesheet.rules.map(obj => {
        if (obj.selectors) {
            obj.selectors = obj.selectors.map(selector => `${selector}[${uuid}]`)
        }
        return obj
    })
    return css.stringify(cssObj, {})
}

module.exports = extract;