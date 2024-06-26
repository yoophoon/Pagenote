import { Paper, styled, useTheme } from "@mui/material";
import { Root } from 'hast'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { useContext, useEffect, useRef, useState, useTransition } from 'react'
import { EditorContext } from "..";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


//// @ts-expect-error: untyped.

// import ReactDom from 'react-dom/client'
// import Markdown from 'react-markdown'
// To do: replace with `starry-night` when async plugins are supported.
// import rehypeHighlight from 'rehype-highlight'
// import rehypeRaw from 'rehype-raw'
// import rehypeSlug from 'rehype-slug'
// import remarkGfm from 'remark-gfm'
// import remarkToc from 'remark-toc'
import { EOperation, ERenderTarget } from '../../pagenoteTypes'
import '@wooorm/starry-night/style/both' 
//关于导入css的问题
//https://www.bilibili.com/video/av892934722/?p=1&t=334
//https://vitejs.dev/guide/features.html#glob-import
// import markupDark from 'github-markdown-css?raw'
// import 'github-markdown-css'
import MarkupRender from "../../Background/MarkdownRender";

const MarkdownPresentation = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: 'fit-content',
    margin:0,
    marginTop:5,
    // minHeight: 700,
    lineHeight: 1.3,
    fontSize: theme.typography.fontSize,
    overflow: 'hidden',
    counterReset: 'lineRow',
    // '& *': {
    //     ...theme.typography.body2,
    // },
    '& *':{
        fontWeight:'normal !important',
        fontSize:16,
        lineHeight:1.3,
        whiteSpace:'break-spaces',
        fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
    },
    '& > *': {
        position: 'relative',
        margin:'0 !important',
        paddingLeft: 25,
        width:'calc(100% - 26px)',
    },
    '& > *::before': {
        counterIncrement: 'lineRow',
        content:'counter(lineRow)',
        paddingRight: 3,
        position: 'absolute',
        left: 0,
        top: 0,
        width: 21,
        height: '100%',
        textAlign: 'right',
        borderRight: '1px solid red',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }
}))

const UserTextArea = styled('textarea')(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    // color: "#00000000",
    width:'calc(100% - 26px)',
    height: 'fit-content',
    position: 'absolute',
    inset: 0,
    // minHeight: 700,
    lineHeight: 1.3,
    margin:0,
    marginTop:5,
    resize: 'none',
    // backgroundColor: '#00000000',
    fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
    fontSize:16,
    fontWeight:'normal',
    padding: 0,
    paddingLeft: 25,
    border: 'none',
    outline: 'none',
    outlineOffset: 2,
    overflow: 'hidden',
    caretColor: theme.palette.text.primary,
    whiteSpace:'break-spaces',
}));

const EditorContentContainer = styled(Paper)(({ theme }) => ({
    fontSize: theme.typography.fontSize,
    position: 'relative',
    width:'100%'
}))


// react无法接管页面编辑的元素，采用其他函数操作编辑元素的hast
// { children }: { children: React.ReactNode }
export default function EditorContent() {
    //获取初始值
    const editorContext = useContext(EditorContext)
    if(editorContext==null) return
    const {editorStatus, setEditorStatus}=editorContext
    // const [isPending,startTransition]=useTransition()
    const [vfile, setVfile] = useState({
        content: editorContext.editorStatus.content,
        color:'#00000000',
        'background-color':'#00000000',
        selectionStart:0,
        selectionEnd:0,
        renderPort:chrome.runtime.connect({ name: 'renderport' }),
        blurFocus:false,
    })
    const [highlightMarkdown,setHightlightMarkdown]=useState('')
    const theme=useTheme()
    // const [renderPort, setRenderPort] = useState<chrome.runtime.Port>()

    //在select事件中修改editorstatus的selectStart和selectEnd，方便其他组件获取数据
    // const handlerSelect=(e:React.SyntheticEvent<HTMLTextAreaElement, Event>)=>{
    //     const target=e.target as typeof e.currentTarget
    //     if(target.selectionDirection=='forward'){
    //         setEditorStatus(editorStatus=>({
    //             ...editorStatus,
    //             selectStart:target.selectionStart,
    //             selectEnd:target.selectionEnd,
    //         }))
    //     } else if(target.selectionDirection=='backward'){
    //         setEditorStatus(editorStatus=>({
    //             ...editorStatus,
    //             selectStart:target.selectionEnd,
    //             selectEnd:target.selectionStart,
    //         }))
    //     }       
    // }

    const handlerFocus=(e:React.FocusEvent<HTMLTextAreaElement, Element>)=>{
        // e.preventDefault()
        // e.stopPropagation()
        // console.log('focus e',e)
        // console.log('editorStatus...',editorStatus)
        // // e.target.focus()
        // setTimeout(()=>{
        //     e.target.setSelectionRange(editorStatus.selectStart,editorStatus.selectEnd,'forward')
        // },10000)
        setVfile(vfile=>({
            ...vfile,
            color:'',
            "background-color":'',
            blurFocus:false,
        }))
    }

    const handlerBlur=(e:React.FocusEvent<HTMLTextAreaElement, Element>)=>{
        //如果textarea的内容发生变动则在textarea失去焦点是对其内容进行渲染
        // if(vfile.content!=e.target.value){
            vfile.renderPort.postMessage({
                operation: EOperation.render,
                value: {
                    target: ERenderTarget.hightlight,
                    content: e.target.value
                }
            })
        // }
        //更新editorStatus，需要更新selection的位置以供其他组件使用
        if( vfile.selectionEnd!=e.target.selectionEnd||
            vfile.selectionStart!=e.target.selectionStart||
            editorStatus.content!=e.target.value){
            setEditorStatus(editorStatus=>({
                ...editorStatus,
                selectStart:e.target.selectionStart,
                selectEnd:e.target.selectionEnd,
                content:e.target.value,
            }))
        }
        //更新textarea的状态 颜色及背景色
        setVfile(vfile=>({
            ...vfile,
            content:e.target.value,
            color:'#00000000',
            "background-color":'#00000000',
            selectionEnd:e.target.selectionEnd,
            selectionStart:e.target.selectionStart,
            blurFocus:false,
        }))
        console.log('blur e',e)
    }

    useEffect(()=>{
        console.log(editorStatus)
        // const editorContentEle = document.querySelector(`#${CSS.escape(editorStatus.contentID)}`) as HTMLTextAreaElement
        // if (editorContentEle) {
        //     editorContentEle.focus()
        //     editorContentEle.setSelectionRange(editorStatus.selectStart,editorStatus.selectEnd,'none')
        // }
        vfile.renderPort.postMessage({
            operation: EOperation.render,
            value: {
                target: ERenderTarget.hightlight,
                content: editorStatus.content,
                //.replace(/[ ]+/,' ').replace(/[ ]?\n[ ]?/,'\n').trimStart(),
            }
        })
        setVfile(vfile=>({
            ...vfile,
            content:editorStatus.content,
            selectionEnd:editorStatus.selectEnd,
            selectionStart:editorStatus.selectStart,
            blurFocus:true,
        }))
    },[editorStatus.content])

    useEffect(()=>{
        const editorContentEle = document.querySelector(`#${CSS.escape(editorStatus.contentID)}`) as HTMLTextAreaElement
        if (editorContentEle && vfile.blurFocus) {
            editorContentEle.focus()
            editorContentEle.setSelectionRange(vfile.selectionStart,vfile.selectionEnd,'none')
        }
    },[vfile.selectionStart,vfile.selectionEnd])

    useEffect(() => {
        if(!vfile.renderPort){
            setVfile(vfile=>({
                ...vfile,
                renderPort:chrome.runtime.connect({ name: 'renderport' })
            }))
        }
        //打开editor时将默认的content渲染一次
        vfile.renderPort.postMessage({
            operation: EOperation.render,
            value: {
                target: ERenderTarget.hightlight,
                content: vfile.content
                //.replace(/[ ]+/,' ').replace(/[ ]?\n[ ]?/,'\n').trimStart(),
            }
        })

        vfile.renderPort.onMessage.addListener((response) => {
            if (!response) {
                console.log('something is wrong')
                return
            }
            console.log(response)
            setHightlightMarkdown(response.renderedContent)
            // setVfile(vfile=>({
            //     ...vfile,
            //     content: response.content,
            //     renderedContent: response.renderedContent,
            // }))
        })
        return ()=>{
            vfile.renderPort.disconnect()
        }
    }, [])

    return (<EditorContentContainer
    sx={{height:`calc(100% - ${editorStatus.showTitle?theme.pagenote.pagenoteEditor.title.height:0}px - ${editorStatus.showTools?theme.pagenote.pagenoteEditor.tools.height:0}px - 2px)`}}
    >
        {!editorStatus.renderMarkdown?
            <MarkdownPresentation className="draw"
                id="pagenoteEditorContent"
                dangerouslySetInnerHTML={{ __html: highlightMarkdown }} /> :
            <MarkdownPresentation 
            className="draw markdown-body" 
            id="pagenoteEditorContent"                >
                <MarkupRender markdown={editorStatus.content}></MarkupRender>
            </MarkdownPresentation>
        }
        <UserTextArea
            id={editorStatus.contentID}
            spellCheck="false"
            className="write"
            // rows={vfile.content.split('\n').length + 1}
            // value={editorStatus.content}
            value={vfile.content}
            style={{
                color:vfile.color,
                backgroundColor:vfile["background-color"],
                display:editorStatus.renderMarkdown?"none":"block"
            }}
            // onSelect={e=>handlerSelect(e)}
            onFocus={handlerFocus}
            onBlur={handlerBlur}
            onChange={function (event) {
                    setVfile(vfile=>({
                        ...vfile,
                        content:event.target.value,
                    }))
            }} 
            />
    </EditorContentContainer>)
}


//renderContent(event.target.value, setVfile)
// function renderContent(content: string, renderCallBack: ({ content, renderedContent }: { content: string, renderedContent: string }) => void) {



//     chrome.runtime.sendMessage({
//         operation: 'render',
//         value: {
//             target: ERenderTarget.hightlight,
//             content
//         }
//     }, (response) => {
//         console.log(response)
//         renderCallBack({
//             content,
//             renderedContent: response.renderedContent
//         })
//     })
// }




{/* <Button onClick={e => handleClick(children)}>sendMessage</Button>
const handleClick = (markdown: string) => {
    chrome.runtime.sendMessage({ operation: 'render', value: markdown });
    const markUp = renderToStaticMarkup(<Markdown>{markdown}</Markdown>)
    console.log(markUp)
    // const domParser = new DOMParser()
    // node.parentElement?.insertBefore(domParser.parseFromString(markUp, 'text/html'), node)
} */}



// const pagenoteEditorContentStyle = {
//     width: 900,
//     height: 700,
//     mt: 1,
//     outlineColor: 'text.disabled',
//     outlineStyle: 'solid',
//     outlineWidth: 1,
//     outlineOffset: 1,
//     fontSize: 16,
//     overflow: 'scroll',
//     whiteSpace: 'normal',
//     //插入光标颜色，默认值为auto
//     caretColor: 'auto',
//     '&:focus': {
//         color: 'text.primary'
//     },
//     '& > *': {
//         position: 'relative',
//         pl: 3.7,
//         color: 'text.primary',
//         bgcolor: 'background.default',
//         'background- clip': 'padding-box',
//     },
//     '& pre': {
//         color: '',
//         bgcolor: '',
//     },
//     '& a': {
//         cursor: 'pointer',
//     },
//     '& > *::before': {
//         //content: `attr(pagenoteeditorcontentline)`,

//         color: 'text.secondary',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: 29,
//         height: '100%',
//         fontSize: 16,
//         textAlign: 'right',
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//         borderRightColor: 'text.disabled',
//         borderRightStyle: 'solid',
//         borderRightWidth: 1
//     }
// }

/**
 * starryNight仓库提供了一个样例用于添加行号，测试发现这个仅对行第一个元素为element类型时才生效
 * 如果时textNode似乎是不生效的
 * @https://github.com/wooorm/starry-night?tab=readme-ov-file#example-adding-line-numbers
 * @param ele 需要添加行号的目标hast树
 * @returns 返回转化后的hast树，每一行用p元素外套一层
 */
function nodesInline(ele: Root): Root {
    const newChildInline = []
    for (let i = 0; i < ele.children.length; i++) {
        let processedTextNodes: string[] = []
        if (ele.children[i].type === 'text') {
            processedTextNodes = processTextNode((ele.children[i] as HTMLInputElement).value)
        }
        //如果这个节点是元素节点，processedTextNodes则为空
        if (processedTextNodes.length === 0) {
            if (newChildInline.length === 0) {
                newChildInline.push({
                    type: 'element',
                    tagName: 'p',
                    children: [ele.children[i]]
                })
            } else {
                //@ts-ignore
                newChildInline
                    .at(-1)
                    //@ts-ignore
                    .children.push(ele.children[i])
            }
            continue
        }//如果这个节点是文本节点，且其中不存在换行符
        else if (processedTextNodes.length === 1) {
            if (newChildInline.length == 0) {
                newChildInline.push({
                    type: 'element',
                    tagName: 'p',
                    children: [ele.children[i]]
                })
            } else {
                //@ts-ignore
                newChildInline
                    .at(-1)
                    //@ts-ignore
                    .children.push(ele.children[i])
            }
            continue
        }//如果这个节点是文本节点，且存在换行符
        else if (processedTextNodes.length > 1) {
            // 处理当前节点
            for (const [newline, processedTextNode] of processedTextNodes.entries()) {
                //如果newChildInline里面没有数据，需要创建第一个数据
                if (newChildInline.length == 0) {
                    //如果第一个processedTextNode为空，那么创建一个空白p
                    if (newline === 0 && processedTextNode === '') {
                        //@ts-ignore
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: ' '.replace(' ', '\u200B')
                            }]
                        })
                        continue
                    } //如果第一个processedTextNode为空，那么创建一个包含第一个processedTextNode的值的p
                    else if (newline === 0 && processedTextNode !== '') {
                        //@ts-ignore
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: processedTextNode
                            }]
                        })
                        continue
                    }
                }//newChildInline已经有值了，则将第一个processedTextNode的值添加到已有值得末尾
                else if (newChildInline.length != 0 && newline == 0) {
                    //@ts-ignore
                    newChildInline
                        .at(-1)
                        //@ts-ignore
                        .children.push({
                            type: 'text',
                            value: processedTextNode,
                        })
                    continue
                } else if (newChildInline.length != 0 && newline > 0) {
                    if (processedTextNode === '') {
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: ' '.replace(' ', '\u200B')
                            }]
                        })
                    } else {
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: processedTextNode
                            }]
                        })
                    }
                }
            }
        }
    }
    return {
        type: 'root',
        //@ts-ignore
        children: newChildInline
    }
}

function processTextNode(text: string) {
    const splitedText = text.split('\n')
    const recordLine = []
    for (const element of splitedText) {
        recordLine.push(element)
    }
    return recordLine
}
