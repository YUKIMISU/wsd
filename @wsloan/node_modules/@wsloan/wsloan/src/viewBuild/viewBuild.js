/**
 * Created by chenhm on 04/08/2017.
 * 解构:将Vue分解成template、script、sass
 */
 

const fs = require('fs');
const path = require('path');
const templateExtract = require('./templateExtract.js');
const jsbuild = require('./jsbuild.js');
const cssExtract = require('./cssExtract.js');
const commonReg = '([\\s\\S]*?),?\\s*';
const attrReg = '(?:(?:components|computed|data|methods|mounted|ready|created|mounted|props|beforeDestroy)|};?\\s*<\/script>)';
const os = require('os');

function readVueFile(filePath){
    let data = fs.readFileSync(filePath,'utf-8');

    let cssLang = '';

    //生成输出路径
    let distPath = filePath.replace(/([a-zA-Z0-9-]+)\.vue/,(match,fileName) => {
        return `dist/${fileName}`
    });

    if(!fs.existsSync(path.dirname(distPath))) fs.mkdirSync(path.dirname(distPath));

    /**
     * 提取vue文件中computed信息
     * computed在viewBuild中的实现原理就是 将  xxx转换成方法xxx()调用
     * 所以需要先提取computed中的属性然后对template中用到的属性进行转换
     */
    let targetReg = new RegExp('computed'+commonReg+attrReg);
    let computedDataList = [];

    try {
        data.replace(targetReg,(match,computedStr) => {
            computedStr.replace(/(\w+)\s*:\s*function/g,function(match,computedData){
                computedDataList.push(computedData);
            })
        });
    } catch (error) {
        console.log('--------' + distPath + '-------------构建出错1')
        console.log(error)
    }

    /**
     * 1、获取模板信息
     *    infoFromTemplate{eventRegister,propsRegister,modelRegister}
     * 2、输出html文件
     */
    let infoFromTemplate;
    let templateModule;

    let tpCut = os.type().match(/windows/i) ? /<template[^>]*?>((?:.|\r\n)*?)<\/template>/ : /<template[^>]*?>((?:.|\n)*?)<\/template>/

    try {
        data.replace(tpCut,(match,content) => {
            templateModule = content;
            // console.log(content)
            infoFromTemplate = templateExtract(content,distPath,computedDataList);
        });
    } catch (error) {
        console.log('--------' + distPath + '-------------dist/html构建出错2')
        console.log(error)
    }

    //输出样式表

    try {
        if(data.indexOf('<style') >= 0){
            let csCut = os.type().match(/windows/i) ? /(<style[^>]*?>)((:?.|\r\n)*?)<\/style>/ : /(<style[^>]*?>)((:?.|\n)*?)<\/style>/
            data.replace(csCut,(match,startTag,content) => {
                let isModule = startTag.indexOf('module')>0 || startTag.indexOf('scoped')>0;
                let lang = cssLang = startTag.match(/(?:lang=['"](\w*)['"])/) ? startTag.match(/(?:lang=['"](\w*)['"])/)[1]:'';
                cssExtract(distPath,content,isModule,lang);
            });
        }else{
            cssExtract(distPath,'');
        }
    } catch (error) {
        console.log('--------' + distPath + '-------------dist/css构建出错3')
        console.log(error)
    }
    

    
    //jsBuild

    try {
        if(data.indexOf('<script')){
            let jsCut = os.type().match(/windows/i) ? /(<script>(?:.|\r\n)*<\/script>)/ : /(<script>(?:.|\n)*<\/script>)/
            data.replace(jsCut,function (match, content) {
                let components = jsbuild(content,templateModule,infoFromTemplate,distPath,cssLang);
                if(components.length > 0){
                    components.forEach((component) => {
                        readVueFile(path.resolve(filePath.replace(/([a-zA-Z0-9-]+)\.vue/,''),component.path))
                    })
                }
                components = null;
            })
        }
    } catch (error) {
        console.log('--------' + distPath + '-------------dist/js编译出错4')
        console.log(error)
    }
}

module.exports = readVueFile;
