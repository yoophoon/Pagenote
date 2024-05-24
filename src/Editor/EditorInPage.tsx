import { Box, Divider, Modal } from "@mui/material"
import EditorTitle from './EditorTitle'
import EditorToolBar from "./EditorToolBar"
import EditorContent from "./EditorContent"
import { useContext } from "react"
import { EditorContext } from "."
import './Editor.css'

//这个页面同EditorFollowPagenoteFragment及EditorAfterPagenoteFragment两个组件功能一致
//均为设置editor的位置及一些其他的属性
export default function EditorInPage(): JSX.Element {
    //
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 2,
    };

    const { openEditor, setOpenEditor } = useContext(EditorContext)

    return (
        <Modal
            open={openEditor.open}
            onClose={() => {
                if (hasContent() == false) {
                    setOpenEditor({
                        ...openEditor,
                        open: false,
                    })
                }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
                bgcolor={"background.default"}
                color={'text.primary'}
                id='pagenoteEditor'
            >
                <EditorTitle />
                <Divider aria-hidden="true" />
                {/* editor toolbar */}
                <EditorToolBar />
                <Divider aria-hidden="true" />
                <EditorContent >
                </EditorContent>
            </Box>
        </Modal >)
}


/**
 * 
 * @returns true considered content exists while false considered no content
 */
function hasContent(): boolean {
    const pagenoteEditorContentEle = document.querySelector('#pagenoteEditorContent')
    //if pagenoteEditor exsits and its innerhtml contains content except whitespace
    if (pagenoteEditorContentEle &&
        pagenoteEditorContentEle.innerHTML.replace(/[\n\r ]+/, '') != '') {
        //ask user to confirm to leave or not
        //if leave then the content considered null
        const stillClose = confirm("编辑器存在内容，是否退出")
        if (stillClose) return false
    }
    //if pagenoteEditor exsits and its innerhtml includes just whitespace
    else if (pagenoteEditorContentEle &&
        pagenoteEditorContentEle.innerHTML.replace(/[\n\r ]+/, '') == '') {
        return false
    }
    return true
}