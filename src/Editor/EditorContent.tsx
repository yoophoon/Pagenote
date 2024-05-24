import { Paper, styled } from "@mui/material";
import { Root } from 'hast'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { useContext, useEffect, useState } from 'react'

//// @ts-expect-error: untyped.

// import ReactDom from 'react-dom/client'
// import Markdown from 'react-markdown'
// To do: replace with `starry-night` when async plugins are supported.
// import rehypeHighlight from 'rehype-highlight'
// import rehypeRaw from 'rehype-raw'
// import rehypeSlug from 'rehype-slug'
// import remarkGfm from 'remark-gfm'
// import remarkToc from 'remark-toc'
import { EOperation, ERenderTarget } from '../pagenoteTypes'
import '@wooorm/starry-night/style/both'

const MarkdownPresentation = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    position: 'absolute',
    inset: 0,
    width: 700,
    height: 'fit-content',
    minHeight: 700,
    lineHeight: 1,
    fontSize: theme.typography.fontSize,
    overflow: 'hidden',
    '& *': {
        ...theme.typography.body2,
    },
    '& > p': {
        position: 'relative',
        paddingLeft: 25,
    },
    '& > *::before': {
        paddingRight: 3,
        position: 'absolute',
        left: 0,
        top: 0,
        width: 21,
        height: '100%',
        'text-align': 'right',
        borderRight: '1px solid red',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }
}))

const UserTextArea = styled('textarea')(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: "#00000000",
    width: 700,
    height: 'fit-content',
    minHeight: 700,
    lineHeight: 1,
    position: 'absolute',
    inset: 0,
    resize: 'none',
    backgroundColor: '#00000000',
    fontSize: theme.typography.fontSize,
    padding: 0,
    paddingLeft: 25,
    border: 'none',
    outline: `1px solid ${theme.palette.text.disabled}`,
    outlineOffset: 2,
    overflow: 'hidden',
    caretColor: theme.palette.text.primary,
    whiteSpace: 'pre-wrap',
}));

const EditorContentContainer = styled(Paper)(({ theme }) => ({
    fontSize: theme.typography.fontSize,
    position: 'relative',
    width: 700,
    height: 700,
    overflow: 'auto',
}))

// react无法接管页面编辑的元素，采用其他函数操作编辑元素的hast
// { children }: { children: React.ReactNode }
export default function EditorContent() {


    const [vfile, setVfile] = useState({
        content: '',
        renderedContent: ''
    })
    const [renderPort, setRenderPort] = useState<chrome.runtime.Port>()


    useEffect(() => {
        const renderPort = chrome.runtime.connect({ name: 'renderport' })
        setRenderPort(renderPort)
        console.log('init')
        renderPort.onMessage.addListener((response) => {
            if (!response) {
                console.log('something is wrong')
                return
            }
            console.log(response)
            setVfile({
                content: response.content,
                renderedContent: response.renderedContent,
            })
        })
    }, [])

    return (<EditorContentContainer>
        <MarkdownPresentation className="draw"
            id="pagenoteEditorContent"
            dangerouslySetInnerHTML={{ __html: vfile.renderedContent }}
        >
        </MarkdownPresentation>
        <UserTextArea
            id="pagenoteEditorInput"
            spellCheck="false"
            className="write"
            value={vfile.content}
            rows={vfile.content.split('\n').length + 1}
            onChange={function (event) {
                console.log(event)
                console.log(vfile)
                if (renderPort) {
                    renderPort.postMessage({
                        operation: EOperation.render,
                        value: {
                            target: ERenderTarget.hightlight,
                            content: event.target.value,
                        }
                    })
                }
            }} />
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
