import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { TMessageToEditor } from "../../../pagenoteTypes";

export default function ToolsSetPagenote() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { setTool } = AnchorContext



    const handlerSetPagenote = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        console.log('set pagenote')
        setTool('setPagenote')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerSetPagenote}
            sx={{
                position: 'relative',
                width: 30,
                height: '100%',
                transformOrigin: 'center',
                scale: '1.2',
                transform: 'translateY(-1px)'
            }}
        >
            <Tooltip title="pagenote" TransitionComponent={Zoom} arrow>
                <EditNoteIcon > </EditNoteIcon>
            </Tooltip>
        </IconButton>)
}

