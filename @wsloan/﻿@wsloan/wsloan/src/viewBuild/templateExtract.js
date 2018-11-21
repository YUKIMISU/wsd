/**
 * Created by chenhm on 04/08/2017.
 * 提取template中需要在build过程中用到的事件信息,并生成符合要求的template
 */

const vOnDirect = /(?:v-on:|@)(click|blur|change|focus|keydown|keypress|keyup|load|mousedown|mousemove|mouseout|mouseover|mouseup|reset|resize|select|submit|unload)(.*?)\s*="(.*?)"/g;

const vModelDirect = /<(\w*)[^>]*?v-model\s*="([^>]*?)"[^>]*?>/g;

const fs = require('fs');

const nanoid = require('nanoid');

const path = require('path');

const beautify = require('js-beautify').html_beautify;

const htmlTag = 'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,' +
    'command,keygen,source,track,wbr,span,strong,em,button,b,a,address,article,applet,aside,' +
    'audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,' +
    'form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,' +
    'object,ol,output,p,pre,section,script,table,tbody,td,tfo|ot,th,thead,tr,ul,video,abbr,acronym,applet,' +
    'basefont,bdo,big,br,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,' +
    'select,small,strike,sub,sup,textarea,tt,u,var,option';

const attr = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;


function extract(template, filepath, computedDataList) {
    let originTemplate = '';

    let infoFromTemplate = {
        eventRegister: {},
        propsRegister: {},
        modelRegister: {}
    };

    if (!template) return;

    //处理事件机制、并将信息保存在eventRegister
    originTemplate = template = template.replace(vOnDirect, (match, eventType, option, callback) => {
        let elId = nanoid(5);
        let str = '';

        infoFromTemplate.eventRegister[elId] = {
            eventType: eventType,
            callback: callback,
            option: option,
            paramCount: callback && callback.split(',').length
        };

        //如果有需要传入执行函数的参数需要保存在data-role-param中,以便后期查找
        if (callback.indexOf('(') >= 0) {
            callback.replace(/\((.*)\)/, (match, param) => {
                if(param.indexOf('$event') >= 0){
                    infoFromTemplate.eventRegister[elId].option.event = true;
                    param = param.split(',')[0]
                }
                if (param.indexOf("\"") >= 0 || param.indexOf("'") >= 0) {
                    param = param.replace(/["']/g,'');
                    str += `data-role-param="${param}"`;
                } else {
                    if(param === '$event'){
                        infoFromTemplate.eventRegister[elId].callback = infoFromTemplate.eventRegister[elId].callback.replace(/\(.*?\)/,'');
                    }else{
                        var paramList = param.split(',')
                        if(paramList.length && paramList.length > 1){
                            paramList.forEach((item,idx) => {
                                str += `:data-role-param${idx+1}="${item}"`;
                            })
                        }else{
                            str += `:data-role-param="${param}"`;
                        }
                    }
                }
            });
        }

        str += `data-role-event="${elId}"`;

        return str
    });

    //处理表单控件绑定、并将信息保存在modelRegister
    template = template.replace(vModelDirect, (match, tag, watchData,tagIndex) => {
        if(match.indexOf('checkbox') >= 0){
            //checkbox
            match = match.replace(/(?:v-model="(.*?)")/g, (match2, s1, index) => {
                if(originTemplate.indexOf(match2) !== originTemplate.lastIndexOf(match2)){
                    //全局有多个
                    if(index + tagIndex === originTemplate.indexOf(match2)){
                        //当前为第一个
                        let elId = nanoid(5);
                        let info = infoFromTemplate.modelRegister[elId] = {tag: tag};
                        info.watchData = s1;
                        info.checkbox = 'multi';
                        return `data-role-model="${elId}"`;
                    }else{
                        //当前不为第一个
                        let elId;
                        for(let key in infoFromTemplate.modelRegister){
                            if(infoFromTemplate.modelRegister[key].watchData === s1){
                                elId = key;
                            }
                        }
                        return `data-role-model="${elId}"`;
                    }
                }else{
                    //全局单个
                    let elId = nanoid(5);
                    let info = infoFromTemplate.modelRegister[elId] = {tag: tag};
                    info.watchData = s1;
                    info.checkbox = 'single';
                    return `data-role-model="${elId}"`;
                }
            });
        }else if(match.indexOf('radio') >= 0){
            match = match.replace(/(?:v-model="(.*?)")/g, (match2, s1, index) => {
                if(originTemplate.indexOf(match2) !== originTemplate.lastIndexOf(match2)){
                    //全局有多个
                    if(index + tagIndex === originTemplate.indexOf(match2)){
                        //当前为第一个
                        let elId = nanoid(5);
                        let info = infoFromTemplate.modelRegister[elId] = {tag: tag};
                        info.watchData = s1;
                        info.radio = true;
                        return `data-role-model="${elId}"`;
                    }else{
                        //当前不为第一个
                        let elId;
                        for(let key in infoFromTemplate.modelRegister){
                            if(infoFromTemplate.modelRegister[key].watchData === s1){
                                elId = key;
                            }
                        }
                        return `data-role-model="${elId}"`;
                    }
                }else{
                    //全局单个
                    let elId = nanoid(5);
                    let info = infoFromTemplate.modelRegister[elId] = {tag: tag};
                    info.watchData = s1;
                    info.radio = 'single';
                    return `data-role-model="${elId}"`;
                }
            });
        }else if(tag === 'textarea' || tag === 'select'){
            let elId = nanoid(5);
            let info = infoFromTemplate.modelRegister[elId] = {tag: tag};

            match = match.replace(/(?:v-model="(.*?)")/g, (match2, s1) => {
                info.watchData = s1;
                return `data-role-model="${elId}"`;
            });
        }else{
            let elId = nanoid(5);
            let info = infoFromTemplate.modelRegister[elId] = {tag: tag};

            match = match.replace(/(?:v-model="(.*?)")/g, (match2, s1) => {
                info.watchData = s1;
                return `data-role-model="${elId}" :value="${s1}"`;
            });
        }
        return match
    });

    //处理template中的自定义标签,并将props相关信息保存到propsRegister中
    //例如:将<component-one>转为<div id="compnonent-one">
    template = template.replace(/<(\/?)([\w-]+)(.*?)>/g, (match, end, tag, props) => {
        if (htmlTag.indexOf(tag) < 0) {
            if (end) {
                return '</div>';
            }
            tag = tag.replace(/-(\w)/g,function (match, char) {
                return char.toUpperCase();
            })

            infoFromTemplate.propsRegister[tag] = {};

            let vStr = '';

            props.replace(attr, function (match, name, value) {
                if(name === 'v-if' || name === 'v-show')  vStr = name + '="' + value + '"';
                infoFromTemplate.propsRegister[tag][name] = value;
            });

            if (!infoFromTemplate.propsRegister[tag].ref) infoFromTemplate.propsRegister[tag].ref = tag;

            return `<div id="${tag}" ${vStr} ignore="true">`;
        }
        return match
    });


    //对computed属性进行处理，将fn加上()
    for(let key of computedDataList){
        template = template.replace(key,key+'()');
    }

    template = template.replace(/(['"])(\.{1,2}\/)/g,function (match,head,s) {
        return head+"../" + s;
    })

    //删除注释
    template = template.replace(/<!--.*?-->/g,'');

    fs.writeFileSync(filepath + '.html', beautify(template));
    // console.log(filepath + ".tpl文件已生成");

    return infoFromTemplate;
}


module.exports = extract;
