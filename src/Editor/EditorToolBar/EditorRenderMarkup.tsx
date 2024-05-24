import { IconButton, SvgIcon, Tooltip, Zoom } from "@mui/material";
import SvgMarkup from "../../assets/svg/Markup";
import SvgMarkdown from "../../assets/svg/Markdown";
import { useRef, useState } from "react";
import { markUpStr } from "../../lib/markUp";

export default function EditorMarkup() {
    const [contentFormat, setContentFormat] = useState({
        format: 'markup',
        formatIcon: SvgMarkup,
    })
    const preContent = useRef('')

    const handleMarkupContent = (preContent: React.MutableRefObject<string>) => {
        const editorContentEle = document.querySelector('#pagenoteEditorContent')
        if (editorContentEle == null) return
        if (editorContentEle.getAttribute('contenteditable') == 'plaintext-only') {
            editorContentEle.setAttribute('contenteditable', 'false')
            preContent.current = editorContentEle.innerHTML
            editorContentEle.innerHTML = markUpStr(preContent.current)
            setContentFormat({
                format: 'markDown',
                formatIcon: SvgMarkdown,
            })
        } else if (editorContentEle.getAttribute('contenteditable') == 'false') {
            editorContentEle.setAttribute('contenteditable', 'plaintext-only')
            editorContentEle.innerHTML = preContent.current
            setContentFormat({
                format: 'markUp',
                formatIcon: SvgMarkup,
            })
        }
    }


    return (
        <Tooltip title={contentFormat.format} TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary' onClick={() => handleMarkupContent(preContent)}>
                <SvgIcon component={contentFormat.formatIcon} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

