import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material';
import { EditorContext } from '../../index';
import { useContext } from 'react';
export default function EditorClose() {
    const editorContext=useContext(EditorContext)
    if(editorContext==null) return
    const { editorStatus,setEditorStatus } = editorContext
    const handlerEditorClose=()=>{
        //获取当前editor的title和content
        const editorContent = document.querySelector(`#${CSS.escape(editorStatus.contentID)}`)
        const editorTitle = document.querySelector(`#${CSS.escape(editorStatus.titleID)}`)
        let pagenoteContent: string , pagenoteTitle: string 
        if (editorContent != null) {
            pagenoteContent = editorContent.textContent ?? editorStatus.content
        }
        if (editorTitle != null) {
            pagenoteTitle = editorTitle.textContent ?? editorStatus.title
        }
        //更新contentpagenote
        setEditorStatus(editorStatus=>({
            ...editorStatus,
            open:false,
            title:pagenoteTitle,
            content:pagenoteContent,
        }))
    }



    return (
        <Tooltip title="close" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary' onClick={handlerEditorClose}>
                <SvgIcon component={CloseIcon} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}