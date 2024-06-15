import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from "../PagenoteIcon";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ToolsDelete() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext

    const handlerDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setAllPagenotesInfo(contentPagenotes => {
            return contentPagenotes.filter(pagenote=>pagenote?.contentPagenote.pagenoteID!=contentPagenote.pagenoteID)
        })
        deleteAnchorAndIcon(contentPagenote.pagenoteID)
        setTool('delete')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerDeleteClick}
            sx={{ position: 'relative',width:30,height:'100%' }}
        >
            <Tooltip title="删除pagenote" TransitionComponent={Zoom} arrow>
                <DeleteForeverIcon > </DeleteForeverIcon>
            </Tooltip>
        </IconButton>)
}


function deleteAnchorAndIcon(pagenoteID:number){
    const pagenoteanchors=document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenoteID}"]`)
    const pagenoteicon=document.querySelector(`pagenoteicon[pagenoteid="${pagenoteID}"]`)
    pagenoteanchors.forEach(pagenoteanchor=>pagenoteanchor.outerHTML=pagenoteanchor.innerHTML)
    pagenoteicon?.remove()
}