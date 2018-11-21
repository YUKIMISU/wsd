/**
 * Created by chenhm on 02/08/2017.
 */

const path = require('path');

const beautify = require('js-beautify').js_beautify;

const fs = require('fs');

//VM data注册表
let watchRegister = [];

//view 配置项初始值
let viewOption = {};

//组件引用注册表
let componentsRegister =[];

//子组件 需要监视的data注册表
let componentWatchRegister = {};

// v-model一些特殊的元素需要特殊处理 比如 select textarea
let modelWatchRegister = {};

const commonReg = '([\\s\\S]*?),?\\s*';
const attrReg = '(?:(?:components|computed|methods|mounted|ready|created|mounted|props|beforeDestroy|beforeCreate)|};?\\s*<\/script>|\\s*})';


function jsbuild(script, templateStr, infoFromTemplate, filepath, cssLang) {
    //由于闭包的存在，需要手动重置变量
    viewOption = {};
    componentsRegister = [];
    componentWatchRegister = {};
    modelWatchRegister = {};
    watchRegister = [];
    
    script = componentsHandler(script, infoFromTemplate.propsRegister,viewOption);
    var vueOption = {}
    script.replace(/export\s*default\s*({[\s\S]*})\s*<\/script>/,function(match,content){
        vueOption = eval('(' + content + ')');
    })
    importComponentHandler(script);
    vueOptionHandler(vueOption, templateStr, infoFromTemplate,filepath);
    outputJs(filepath, cssLang);
    return componentsRegister;
}

/**
 * 将所有要引入的组件、以及插件储存下来
 */
function importComponentHandler(componentEntrance) {
    if(componentEntrance = componentEntrance.trim()){
        //保存组件名和路径--》构建子组件js
        componentEntrance.replace(/import\s*(.*?)\s*from\s*['"](.*?)['"]/g,function (match,componentName,path) {
            componentsRegister.push({
                componentName:componentName,
                path:path
            })
        });

        //提取需要额外引入的插件比如  var Slider = require('components/banner/index');
        componentEntrance.replace(/(var|let|const)[\s\S]*?=\s*require(.*?)[;\s]/g,function (match) {
            match = match.replace(/\.{1,2}\//,function (match2) {
                return "../" + match2;
            })
            viewOption.lib ? viewOption.lib += match : viewOption.lib = match;
        })
    }
}

/**
 * 处理Vue中的配置项
 * params{vueOption:vue配置项的string,templateStr:模板字符串,infoFromTemplate:模板提取的信息}
 * infoFromTemplate:{propsRegister,eventRegister,modelRegister}
 */
function vueOptionHandler(vueOption, templateStr, infoFromTemplate, filepath) {
    dataHandler(vueOption, templateStr);
    propsHandler(vueOption);
    eventsHandler(infoFromTemplate.eventRegister);
    readyHandler(vueOption, infoFromTemplate.modelRegister, filepath);
    mountedHandler(vueOption);
    beforeDestroyHandler(vueOption);
    watchHandler(vueOption);
    methodsHandler(vueOption);
    createdHandler(vueOption);
    computedHandler(vueOption);
    beforeCreateHandler(vueOption);
}


/**
 * 子组件的渲染、以及通信
 * params{vueOption:vue配置项的string,propsRegister:子组件中props相关信息}
 * 这里将不再做VM扫描
 */
function componentsHandler(script, propsRegister,vueOption) {
    var vueBody;
    //提取内容
    script.replace(/export\s*default\s*({[\s\S]*});?\s*<\/script>/,function(match,content){
        vueBody = content;
    })
    var needDel;
    //处理mixins
    let mixinReg = new RegExp('(mixins([\\s\\S]*?))\\s*'+attrReg)
    vueBody.replace(mixinReg,function (match,other,targetOption) {
        needDel = other;
        vueOption.mixins = other;
    });
    //删除污染的字符串
    script = script.replace(needDel + ',','');
    script = script.replace(needDel,'');

    //提取components中的东西
    let targetReg = new RegExp('(components([\\s\\S]*?))\\s*'+attrReg);
    let components = [];
    vueBody.replace(targetReg,function (match,other,targetOption) {
        needDel = match;
        targetOption.replace(/\w+/g,function (match) {
            components.push(match);
        });
    });

    script = script.replace(needDel + ',','');
    script = script.replace(needDel,'');

    //处理组件路径
    var componentCollection = {}
    script.replace(/import\s*(.*?)\s*from\s*['"](.*?)['"]/g,function (match,componentName,path) {
        componentCollection[componentName] = path.replace(/\w*.vue$/,'dist')
    });
    
    //处理组件
    let componentInfoStr = '';
    if(components instanceof Array){
        if(components.length >0 ) componentInfoStr += `this.$refs = {};`;
        components.forEach((compInfo) => {
            let componentInfo = propsRegister[compInfo];
            let componentRef = componentInfo.ref;
            let needRepaint = false;
            componentInfoStr += `this.$refs.${componentRef} = require('../${componentCollection[compInfo]}/${compInfo}.js');`;
            for(let key in componentInfo){
                if(componentInfo.hasOwnProperty(key)){
                    if(key !== 'ref' && key.indexOf(':')<0){
                        if(key.indexOf('v-if')>=0 || key.indexOf('v-show')>=0){
                            let value = componentInfo[key];
                            if(!componentWatchRegister[value]) componentWatchRegister[value] =[];
                            componentWatchRegister[value].push({
                                ref:componentRef,
                                key:key,
                                forbidTransmit:true //该属性是不需要传值的
                            })
                        }else{
                            componentInfoStr += `this.$refs.${componentRef}.${key} = '${componentInfo[key]}';`;
                            needRepaint = true;
                        }
                    }else if(key.indexOf(':') >= 0){
                        if(key.indexOf('v-on:')>=0){
                            let onFn = key.substring(key.indexOf(':')+1).trim();
                            componentInfoStr += `this.$refs.${componentRef}.mediator.on('${onFn}' + this.$refs.${componentRef}.uuid, this.${componentInfo[key]}, this);`;
                        }else{
                            let value = componentInfo[key];
                            componentInfoStr += `this.$refs.${componentRef}.${key.replace(':','')} = this.${componentInfo[key]};`;
                            if(!componentWatchRegister[value]) componentWatchRegister[value] =[];
                            componentWatchRegister[value].push({
                                ref:componentRef,
                                key:key.replace(':','')
                            })
                            needRepaint = true;
                        }
                    }
                }
            }
            //将父组件数据交给子组件后、强制子组件再次渲染
            if(needRepaint) componentInfoStr += `this.$refs.${componentInfo.ref}.$repaint();`
        });
    }
    viewOption.components = componentInfoStr

    return script
}

/**
 * 保留内容
 * 生命周期beforeCreate
 * 通过VM对提取的字符串进行处理
 */
function beforeCreateHandler(vueOption) {
    if(!vueOption.beforeCreate) return;
    var targetOption = vueOption.beforeCreate.toString();
    targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
    viewOption.beforeCreate = bindVM(targetOption);
}

/**
 * 数据层处理
 * 获取第一层属性 生成watch表 与template进行匹配 找出在template中会用
 * 目前没有更好的办法去获取需要监视的属性，只能通过字符串截取
 * 之前有想过生成对象获取keys的方式，但是由于是代码片段，很多值是引用会报错
 */
function dataHandler(vueOption,templateString) {
    var result = vueOption.data && vueOption.data.toString();
    var dataOption = result.substring(result.indexOf('return')+6,result.lastIndexOf('}'))
    dataOption = dataOption.trim();
    if(dataOption.indexOf(';') === (dataOption.length - 1)){
        dataOption = dataOption.substring(0,dataOption.indexOf(';'));
    }
    viewOption.data = dataOption;
    //获取需要检测的变量

    let temporary = dataOption.substring(dataOption.indexOf('{')+1,dataOption.lastIndexOf('}'));
    //将值对象清空掉，将值对象的key也放入到监听列表中
    temporary = temporary.replace(/{[\s\S]*?}/g,"''");

    //逐行提取
    var tmArr = temporary.split('\n');

    for(var i = 0 ;i< tmArr.length; i++){
        var key = tmArr[i].trim();
        if(key){
            key = key.substring(0,key.indexOf(':'))
            if(key && templateString.indexOf(key) >= 0) watchRegister.push(key);
        }
    }
}

/**
 * 组件props处理器
 * 需要将props中申明的数据也放在watch表中，进行监听
 */
function propsHandler(vueOption) {
    if(!vueOption.props) return;
    var targetOption = vueOption.props.toString();
    var attr = targetOption.split(',')
    targetOption = "["
    for(var i = 0;i<attr.length;i++){
        targetOption += `'${attr[i]}'`
        if(i !== attr.length-1) targetOption += ','
    }
    viewOption.props = targetOption + "]"
    attr.forEach(function(key){
        watchRegister.push(key)
    })
}


/**
 * 通过watchRegister 对 methods进行逐行匹配 然后进行处理
 * 通过VM对提取的字符串进行处理
 */
function methodsHandler(vueOption) {
    if(!vueOption.methods || isEmptyObject(vueOption.methods)) return;
    var targetOption = ":{";  
    for (var i in vueOption.methods) {  
        targetOption = targetOption + i + ':' + vueOption.methods[i].toString() + ','
    }
    targetOption = targetOption.substring(targetOption.lastIndexOf(','),0);  
    targetOption += "}"
    viewOption.methods = bindVM(targetOption);
}


/**
 * 获取事件注册表,然后进行事件绑定
 * 注意需要额外处理hi(),hi('f')这两种情况,同时注意this的问题
 * @param eventRegister
 */
function eventsHandler(eventRegister) {
    if(!eventRegister) return;

    let events = '';
    let elIdList = Object.keys(eventRegister);
    elIdList.forEach((key) => {
        let eventOption = eventRegister[key].option;
        let eventOptionStr = '';
        if(eventOption.indexOf('stop') >= 0){
            //阻止单击事件冒泡
            eventOptionStr += `event.stopPropagation();`;
        }else if(eventOption.indexOf('prevent') >= 0){
            //阻止默认事件
            eventOptionStr += `event.preventDefault();`;
        }else if(eventOption.indexOf('capture') >= 0){
            //使用事件捕获机制 未实现
        }else if(eventOption.indexOf('self') >= 0){
            //只对当前对象监听 未实现
        }else if(eventOption.indexOf('once') >= 0){
            //事件只执行一次 未实现
        }

        //处理方法入参，将dom上缓存的数据作为参数传入方法中
        if(eventRegister[key].callback.indexOf('(') >= 0){
            eventRegister[key].callback.replace(/(\w*?)\((.*?)\)/,(match,handle,param) => {
                if(eventRegister[key].paramCount && eventRegister[key].paramCount > 1) {
                    var paramStr = 'var paramList = [];'
                    for(var i = 1;i<=eventRegister[key].paramCount ;i++){
                        paramStr += `paramList.push($(this).data('role-param${i}'));`
                    }
                }
                events += `
                    '${eventRegister[key].eventType} [data-role-event="${key}"]' : function(_this,event){
                        ${eventRegister[key].paramCount && eventRegister[key].paramCount > 1 ? paramStr : ''}
                        ${eventOptionStr?eventOptionStr+'\n':''}_this.${handle}.call(_this,${eventRegister[key].paramCount && eventRegister[key].paramCount > 1 ? "paramList" : "$(this).data('role-param')"},event.originalEvent);
                    },`
            });
        }else{
            events += `
                '${eventRegister[key].eventType} [data-role-event="${key}"]' : function(_this,event){
                    ${eventOptionStr?eventOptionStr+'\n':''}_this.${eventRegister[key].callback}.call(_this,event.originalEvent);
                },`
        }
    });
    if(events) events = events.substring(0,events.lastIndexOf(','));
    viewOption.events = '{' + events + '}'
}

/**
 * 生命周期created
 * 通过VM对提取的字符串进行处理
 */
function createdHandler(vueOption) {
    if(!vueOption.created) return;
    var targetOption = vueOption.created.toString();
    targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
    viewOption.created = bindVM(targetOption);
}

/**
 * 生命周期ready
 * 同时该阶段需要对v-model的元素开启监听,
 * 目前实现input checkbox(单/多) select textarea(目前无法实现M到V这一层,只实现V到M这一层监听)
 */
function readyHandler(vueOption, modelRegister, filepath) {
    let el = filepath.substring(filepath.lastIndexOf('/') + 1);
    var targetOption
    if(vueOption.ready){
        targetOption = vueOption.ready.toString();
        targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
        targetOption = `:function(){` + targetOption + `}`
    }
    if(targetOption){
        initVmodel(targetOption)
    }else{
        let str = `:function(){}`;
        initVmodel(str);
    }

    function initVmodel(targetOption) {

        let str = '\nvar self = this;';

        for (let eid in modelRegister) {
            if (modelRegister.hasOwnProperty(eid)) {
                //处理单个checkbox,只输出true或者false
                if (modelRegister[eid].checkbox === 'single') {
                    // str += `
                    //     $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                    //         self.${modelRegister[eid].watchData} = $(this).is(':checked');
                    //         self.$repaint();
                    //     });`
                    str += `
                        $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                            self.${modelRegister[eid].watchData} = self.${modelRegister[eid].watchData} instanceof Array ? self.${modelRegister[eid].watchData} : [];
                            if($(this).is(':checked')){
                                self.${modelRegister[eid].watchData}.push($(this).val());
                            }else{
                                var rmdata = $(this).val();
                                self.${modelRegister[eid].watchData} = self.${modelRegister[eid].watchData}.filter(function(item){
                                    return item !== rmdata;
                                })
                            }
                            self.$repaint();
                        });`    
                } else if (modelRegister[eid].checkbox === 'multi') {
                    //处理多个checkbox,将所有选中的value组成数组
                    str += `
                        $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                            self.${modelRegister[eid].watchData} = self.${modelRegister[eid].watchData} instanceof Array ? self.${modelRegister[eid].watchData} : [];
                            if($(this).is(':checked')){
                                self.${modelRegister[eid].watchData}.push($(this).val());
                            }else{
                                var rmdata = $(this).val();
                                self.${modelRegister[eid].watchData} = self.${modelRegister[eid].watchData}.filter(function(item){
                                    return item !== rmdata;
                                })
                            }
                            self.$repaint();
                        });`
                } else if (modelRegister[eid].radio) {
                    //处理单选
                    str += `
                        $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                            self.${modelRegister[eid].watchData} = $(this).val();
                            self.$repaint();
                        });`
                } else if (modelRegister[eid].tag === 'select') {
                    //处理select选择列表
                    if (!modelWatchRegister[modelRegister[eid].watchData]) modelWatchRegister[modelRegister[eid].watchData] = [];
                    modelWatchRegister[modelRegister[eid].watchData].push({
                        isSelect: true,
                        eid: eid
                    })
                    str += `
                        $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                            self.${modelRegister[eid].watchData} = $(this).val();
                            self.$repaint();
                        });`
                } else {
                    //处理text以及textarea
                    str += `
                        $('#${el}').on('change','${modelRegister[eid].tag}[data-role-model="${eid}"]',function(){
                            self.${modelRegister[eid].watchData} = $(this).val();
                            self.$repaint();
                        });`
                }
            }
        }

        targetOption = bindVM(targetOption);
        let strArr = targetOption.split('{');
        strArr[1] = str + strArr[1];
        viewOption.ready = strArr.join('{');
    }
}

/**
 * 计算属性
 * 不需要通过VM对提取的字符串进行处理
 */
function computedHandler(vueOption) {
    if(!vueOption.computed || isEmptyObject(vueOption.computed)) return;
    var targetOption = ":{";  
    for (var i in vueOption.computed) {  
        targetOption = targetOption + i + ':' + vueOption.computed[i].toString() + ','
    }
    targetOption = targetOption.substring(targetOption.lastIndexOf(','),0);  
    targetOption += "}"
    viewOption.computed = targetOption;
}

/**
 * 生命周期mounted
 * 通过VM对提取的字符串进行处理
 */
function mountedHandler(vueOption) {
    if(!vueOption.mounted) return;
    var targetOption = vueOption.mounted.toString();
    targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
    viewOption.mounted = bindVM(targetOption);
}

/**
 * 生命周期beforeDestroy
 * 通过VM对提取的字符串进行处理
 */
function beforeDestroyHandler(vueOption) {
    if(!vueOption.beforeDestroy) return;
    var targetOption = vueOption.beforeDestroy.toString();
    targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
    viewOption.beforeDestroy = bindVM(targetOption);
}


/**
 * watch
 * 暂未实现
 */
function watchHandler(vueOption) {
    if(!vueOption.watch) return;
    var targetOption = vueOption.watch.toString();
    targetOption = targetOption.substring(targetOption.indexOf('{')+1,targetOption.lastIndexOf('}'));
    viewOption.watch = targetOption;
}

/**
 * 输出模块:将所有生成的配置项输出
 */
function outputJs(filepath,cssLang) {
    let fileName = filepath.substring(filepath.lastIndexOf('/') + 1);

    let outputStream  = `
        require('./${fileName}.${cssLang ? "scss" : "css"}');
        ${viewOption.lib ? viewOption.lib : ''}
        module.exports = new newView({
            el: '#${fileName}',
            template: function () {
                return require('./${fileName}.html');
            },
            ${viewOption.mixins?viewOption.mixins : 'mixins:[],'}
            components : function(){
                ${viewOption.components ? viewOption.components : ''}
            },
            data : ${viewOption.data ? viewOption.data : '{}'},
            beforeCreate ${viewOption.beforeCreate ? viewOption.beforeCreate : ':function(){}'},
            methods ${viewOption.methods ? viewOption.methods : ':{}'},
            computed ${viewOption.computed ? viewOption.computed : ':{}'},
            created ${viewOption.created ? viewOption.created : ':function(){}'},
            mounted ${viewOption.mounted ? viewOption.mounted : ' :function() {}'},
            ready${viewOption.ready},
            events: ${viewOption.events ? viewOption.events : '{}'},
            props${viewOption.props ? ':' + viewOption.props : ':[]'}
        });
    `;

    fs.writeFileSync(filepath+'.js', beautify(outputStream));
    // console.log(filepath+".js文件已生成");
}

/**
 * VM模块:对所有需要监听data的字符串进行处理，进行自动repaint动作
 */
// function bindVM(targetOption) {
//     let resultStr = '';
//
//     targetOption.replace(/:\s*{(?!\s*function)([\s\S]*)}/,(match,content) => {
//         let obj = eval('({' + content + '})');
//         for(let fnName in obj){
//             if(obj.hasOwnProperty(fnName)){
//                 //每一个方法体做一次检测
//                 let fnBody = obj[fnName].toString();
//                 resultStr = resultStr + `${fnName}:${loopDetect(fnBody)},`;
//
//             }
//         }
//     });
//     if(resultStr) return resultStr;
//
//     return loopDetect(targetOption)
// }
//
// function loopDetect(fnBody){
//     let hasData = false;
//     let refStorage = {};
//     //每个watch注册表里的属性都要校验 1、多个属性 2、多个组件更新
//     watchRegister.forEach((watch) => {
//         let reg = new RegExp("(this|that|_this|self)(?:.|\\[\"|\\[\')" + watch + "(?:(?:\'\\]|\"\\])?\\s*[.=][^=])");
//         //先判断方法体里有没有
//         if(fnBody.match(reg)){
//             //有的话做一个标记
//             hasData = true;
//             //判断组件watch数据注册表中有没有
//             if(componentWatchRegister[watch]){
//                 componentWatchRegister[watch].forEach((item) => {
//                     if(!refStorage[item.ref]) refStorage[item.ref] = [];
//                     refStorage[item.ref].push(watch);
//                 });
//             }
//         }
//     });
//     //重新构建方法体
//     let operateStr = fnBody.substring(0,fnBody.lastIndexOf("}")-1);
//     if(hasData === true) operateStr += `this.$repaint();`;
//     for(let comp in refStorage){
//         for(let changeData of refStorage[comp]){
//             operateStr += `\nthis.$refs.${comp}.${changeData} = this.${changeData};`;
//         }
//         operateStr += `\nthis.$refs.${comp}.$repaint()`;
//     }
//     operateStr += '}';
//     return operateStr
// }
function bindVM(targetOption) {
    let lines = targetOption.split('\n');
    lines.forEach((line, lineIndex) => {
        watchRegister.forEach((watch) => {
            let reg = new RegExp("(this|that|_this|self)(?:.|\\[\"|\\[\')" + watch + "(?:\\[.*?\\])?(?:(?:\'\\]|\"\\])?\\s*[.=][^=])");
            line.replace(reg,(match,prefix) => {
                if(modelWatchRegister[watch]){
                    modelWatchRegister[watch].forEach((item) => {
                        if(item.isSelect) lines[lineIndex] += `$('[data-role-model="${item.eid}"]').val(${prefix}.${watch})`
                    });
                }
                lines[lineIndex] += `\n ${prefix}.$repaint();`;
                if(componentWatchRegister[watch]){
                    componentWatchRegister[watch].forEach((item) => {
                        if(!item.forbidTransmit) lines[lineIndex] += `\n${prefix}.$refs.${item.ref}.${item.key} = ${prefix}.${watch};`;
                        lines[lineIndex] += `\n${prefix}.$refs.${item.ref}.$repaint();`
                    });
                }
            });
        })
    });
    return lines.join('\n');
}

function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  

module.exports = jsbuild;