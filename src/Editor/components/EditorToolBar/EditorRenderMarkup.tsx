import { IconButton, SvgIcon, Tooltip, Zoom } from "@mui/material";
import SvgMarkup from "../../../assets/svg/Markup";
import SvgMarkdown from "../../../assets/svg/Markdown";
import { useContext, } from "react";
import MarkupRender from "../../../Background/MarkdownRender";
import { EditorContext } from "../..";
// import { EOperation, ERenderTarget } from "../../../pagenoteTypes";

export default function EditorMarkup() {

    const editorContext=useContext(EditorContext)
    if(editorContext==null) return
    const {editorStatus,setEditorStatus}=editorContext




    const handlerRenderMarkdown = () => {
        const markupContent=<MarkupRender markdown={editorStatus.content}/>
        console.log(markupContent)
        setEditorStatus(editorStatus=>({
            ...editorStatus,
            renderMarkdown:!editorStatus.renderMarkdown,
            // markupContent:markupContent
        }))
        // if (!editorStatus.renderMarkdown) {
        //     let markupContent = markupRender(editorStatus.content)
        //     console.log(markupContent)
        //     // chrome.runtime.sendMessage({
        //     //     operation:EOperation.render,
        //     //     value:{
        //     //         target:ERenderTarget.markup,
        //     //         content:editorStatus.content,
        //     //     }
        //     // },response=>{
        //         setEditorStatus(editorStatus=>({
        //             ...editorStatus,
        //             markupContent:markupContent,
        //             renderMarkdown:!editorStatus.renderMarkdown,
        //         }))
        //     // })
        // } else {
        //     setEditorStatus(editorStatus=>({
        //         ...editorStatus,
        //         renderMarkdown:!editorStatus.renderMarkdown,
        //     }))
            
        // }
    }


    return (
        <Tooltip title='渲染markdown' TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary' onClick={handlerRenderMarkdown}>
                <SvgIcon component={editorStatus.renderMarkdown?SvgMarkup:SvgMarkdown} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

