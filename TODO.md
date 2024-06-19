页面构建
- [x] popup
- [ ] sidepanelpge
- [x] editor
- [ ] tools
- [ ] home
- [ ] setting

功能实现
- [x] 锚定页面文本(未整合)
- [ ] 消息转发，消息结构设计未开始
- [ ] 数据存储，数据结构设计未开始
- [x] 编辑器功能实现(未整合)
- [ ] ...





```js
消息结构设计  
枚举值  
operation:  
    - openEditor  打开编辑器  
    - openNotesInSidepanel  打开侧栏  
    - render    渲染  //有些页面因为安全策略禁止加载wasm，为避免这些情况，统一使用后台脚本渲染
    - saveContent   保存笔记
    - query    查询
value:发送消息对应的值  
    //openEditor的值
    - {
        //给三种状态
        editorPosition:'inPage'|//固定在页面内
                       //跟随pagenote最后一个元素但不侵入page
                       //会导致遮掩后续文本
                       'followPagenoteFragment'|
                       //在pagenote最后一个元素末尾插入editor
                       //不会遮掩后续文本，但可能会存在布局问题
                       'afterPagenoteFragment'
        //如果存在pagenoteFragment的话
        //实际editor初始值的一部分采用的是pagenoteFragment.textStart
        editorInitValue：pagenoteFragment||undefined
        }
    - sidepanelOrigin   侧栏对应的网站地址  
    - renderNode    需要渲染的reactNode  
    //openEditor的值对应openEditor操作
    {
        operation:'openEditor',
        value:{
        //pagenote标识符
        pagenoteID:crypto.randomUUID(),  
        pagenoteFragment:{
            prefix:string,
            textStart:string,
            textEnd:string,
            suffix:string,
        },
        pagenoteTitle:string,
        pagenoteContent:string,
        pagenoteTimestamp:new Date().getTime(),
        }
    }
    //saveContent的值对应saveContent操作
    {
        operation:'savePagenote',
        value:{
            //pagenote标识符
            pagenoteID:crypto.randomUUID(),
            pagenoteTimeStamp:new Date().getTime(),
            pagenoteFragment:{
                prefix:string,
                textStart:string,
                textEnd:string,
                suffix:string,
            },
            pagenoteStyle:{
                color?: string,
                fontWeight?: string,
                fontStyle?: string,
                //文字装饰
                textDecorationColor?: string,
                textDecorationStyle?: string,
                textDecorationThickness?: string,
                textDecorationLine?: string,
                //显示样式
                display?: string,
                backgroundColor?: string,
                [key: string]: string | undefined
            },
            pagenoteTitle:string,
            pagenoteContent:string,
        }
    }
    //render
    {
        operation:'render',
        value:{
            //渲染的目标
            target:'highlight'|'markup',
            content:'string'
        }
    }
    //pagenoteInfo
    {
        pagenoteID:number,
        pagenoteTimestamp:new Date().getTime(),
        pagenoteFragment?:{
            prefix?:string,
            textStart:string,
            textEnd?:string,
            suffix?:string,
        },
        pagenoteStyle?:{
            color?: string,
            fontWeight?: string,
            fontStyle?: string,
            //文字装饰
            textDecorationColor?: string,
            textDecorationStyle?: string,
            textDecorationThickness?: string,
            textDecorationLine?: string,
            //显示样式
            display?: string,
            backgroundColor?: string,
            [key: string]: string | undefined
        },
        pagenoteTitle:string,
        pagenoteContent:string,
    }
```

[最新电影下载]2024年剧情悬疑
```javascript
console.log(123)
```
# h1