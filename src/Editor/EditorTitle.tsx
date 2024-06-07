import { Typography } from "@mui/material"
import { useContext } from "react"
import { noteContext } from "./EditorInPage"

/**
 * 用户可以双击修改标题，双击选中之后的outline不再清除
 * @returns 
 */

export default function EditorTitle() {

    const notecontext=useContext(noteContext)
    if (notecontext == null) { return }
    const {note,setNote}=notecontext
    //处理双击事件，如果用户对title元素进行双击，先将元素的contenteditable设置为plaintext-only
    //然后选中title的全部文字等待用户修改，代替之前的浏览器弹窗修改标题，这样更符合用户使用习惯
    const handlerDoubleClick = () => {
        const editorTitleEle = document.querySelector('#pagenote-editor-title')
        if (editorTitleEle == null) return
        editorTitleEle.setAttribute('contenteditable', 'plaintext-only')
        const selectedRange = new Range()
        selectedRange.selectNodeContents(editorTitleEle)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(selectedRange)
    }

    //处理失去焦点事件，先将title的contenteditable设置为false
    //然后使用useContext传入的setOpenEditor函数将最新的标题内容更新
    //方便其他组件获取标题
    const handlerBlur = () => {
        const editorTitleEle = document.querySelector('#pagenote-editor-title')
        if (editorTitleEle == null) return
        editorTitleEle.setAttribute('contenteditable', 'false')
        setNote({
            ...note,
            title:editorTitleEle.innerHTML
        })
    }

    return (< Typography
        id="pagenote-editor-title"
        variant="h6"
        component="h4"
        textAlign={'center'}
        bgcolor={"background.default"}
        color={'text.primary'}
        onDoubleClick={handlerDoubleClick}
        onBlur={handlerBlur}
    >
        {note.title}
    </ Typography >)
}

