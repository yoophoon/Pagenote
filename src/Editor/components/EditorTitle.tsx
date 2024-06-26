import { Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import {EditorContext} from '..'

/**
 * 用户可以双击修改标题，双击选中之后的outline不再清除
 * @returns 
 */

export default function EditorTitle() {

    const editorContext=useContext(EditorContext)
    if (editorContext == null) { return }
    const {editorStatus}=editorContext
    const theme=useTheme()
    //处理双击事件，如果用户对title元素进行双击，先将元素的contenteditable设置为plaintext-only
    //然后选中title的全部文字等待用户修改，代替之前的浏览器弹窗修改标题，这样更符合用户使用习惯
    const handlerDoubleClick = (e:React.MouseEvent) => {        
        (e.target as EventTarget&Element).setAttribute('contenteditable', 'plaintext-only')
        
        // const selectedRange = new Range()
        // selectedRange.selectNodeContents(editorTitleEle)
        // const selection = window.getSelection()
        // selection?.removeAllRanges()
        // selection?.addRange(selectedRange)
    }
    // const handlerClick = (e: React.MouseEvent) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     console.log(e)
    // }
    //处理失去焦点事件，先将title的contenteditable设置为false
    //然后使用useContext传入的setOpenEditor函数将最新的标题内容更新
    //方便其他组件获取标题
    const handlerBlur = (e:React.FocusEvent<HTMLHeadingElement, Element>) => {
        (e.target as EventTarget&Element).removeAttribute('contenteditable')
        // const editorTitleEle = document.querySelector('#pagenote-editor-title')
        // if (editorTitleEle == null) return
        // editorTitleEle.setAttribute('contenteditable', 'false')
    }

    return (< Typography
        id={editorStatus.titleID}
        variant="h6"
        component="h4"
        textAlign={'center'}
        bgcolor={"background.default"}
        color={'text.primary'}
        title="修改标题:三击(重设标题)，双击+单击(修改标题)"
        // onClick={e=>handlerClick(e)}
        onDoubleClick={e=>handlerDoubleClick(e)}
        onBlur={e=>handlerBlur(e)}
        sx={{
            background:'none',
            width:'100%',
            height:theme.pagenote.pagenoteEditor.title.height,
            float:'none',
            textOverflow:'ellipsis',
            overflow:'hidden',
            whiteSpace:'nowrap',
        }}
    >
        {editorStatus.title}
    </ Typography >)
}

