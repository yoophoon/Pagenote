import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext} from "react";
import { PagenoteAnchorContext } from "../PagenoteIcon";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EOperation } from "../../../pagenoteTypes";

/**
 * 这个组件用于删除当前pagenote
 * @returns 一个删除按钮，单击则删除当前pagenote并请立其对应的pagenoteAnchor和pagenoteIcon
 */
export default function ToolsDelete() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) return

    const { contentPagenote, setAllPagenotesInfo } = AnchorContext

    const handlerDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setAllPagenotesInfo(contentPagenotes => {
            return contentPagenotes.filter(pagenote => pagenote?.contentPagenote.pagenoteID != contentPagenote.pagenoteID)
        })
        deleteAnchorAndIcon(contentPagenote.pagenoteID)
        chrome.runtime.sendMessage({operation:EOperation.deletePagenote,value:{pagenoteID:contentPagenote.pagenoteID}})
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerDeleteClick}
            sx={{ position: 'relative', width: 30, height: '100%' }}
        >
            <Tooltip title="删除pagenote" TransitionComponent={Zoom} arrow>
                <DeleteForeverIcon > </DeleteForeverIcon>
            </Tooltip>
        </IconButton>)
}

/**
 * 清理pagenoteAnchor和pagenoteIcon
 * @param pagenoteID 需要清理的pagenote的pagenoteID，用于获取其对应pagenoteAnchor和pagenoteIcon
 */
function deleteAnchorAndIcon(pagenoteID:number){
    const pagenoteanchors=document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenoteID}"]`)
    const pagenoteicon=document.querySelector(`pagenoteicon[pagenoteid="${pagenoteID}"]`)
    pagenoteanchors.forEach(pagenoteanchor=>pagenoteanchor.outerHTML=pagenoteanchor.innerHTML)
    pagenoteicon?.remove()
}