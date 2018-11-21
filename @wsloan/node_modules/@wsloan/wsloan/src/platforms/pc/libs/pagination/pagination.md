## 声明分页器

* 和view一起使用

首先引入分页mixin,通过createPagination方法在当前view实例上创建pagination实例

```js 
new View({
    mixins:[require('path/to/mixin/paginntion')], 
    data:{
        page:1
    },  
    ready:function(){
        this.createPagination({
            callback:function({

            })//该callback内部已绑定this为当前view实例
        });
    },
    fetchs:{
        getList:funtion(){
            var _this=this;
            this.ajax({
                    url:'',
                    data:{
                        page:this.page,
                        pagesize:this.pagination.options.pageSize //页容量直接用实例上pagination的pageSize
                    },
                    success:function(){
                        _this.renderPagination(listlen,page,amount)//获取数据成功后,渲染分页
                    }
            });
        }
    }
})
```


createPagination里面通过
```js
    _.extend({},
            {
                activeCls: 'current',//默认激活类
                container: '#J_pagination',//默认分页容器dom
                pageSize: 10 //默认分页页容量
            },options)
```
    
得到pagination的options,options.callback里bind当前当前view实例为this,并将pagination当前页码同步到this.page,使用过程中不需要操作page属性


以下是分页器的默认配置参数说明:

| 属性        | 说明           | 默认值  |
| ------------- |:-------------:| -----:|
| pageSize      | 页容量      |   10 |
| isNumShow | 是否显示分页数字      |    true |
| isSkipShow | 是否显示分页跳码      |    true |
| disabledCls | 上下页按钮失效样式类      |    'disabled' |
| activeCls | 分页数字高亮样式类      |    'cur' |
| container | 分页容器dom      |    '#J_Pagination' |
| shiftText | 上下页按钮内容      |    ['上页', '下页'] |
| amountLayout | 总页数展示形式      |    'string' ['number',string] |
| callback | 分页回调      |     |







    