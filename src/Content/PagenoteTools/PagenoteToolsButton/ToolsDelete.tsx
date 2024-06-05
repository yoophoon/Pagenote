import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from "../PagenoteIcon";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ToolsDelete() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote, setAllPagenotesInfo,  setTool } = AnchorContext



    const handlerFontBoldClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontBold')
    }

    return (
        <IconButton
            color='secondary'
            sx={{ position: 'relative',width:30,height:'100%' }}
        >
            <Tooltip title="设置字体颜色" TransitionComponent={Zoom} arrow>
                <DeleteForeverIcon > </DeleteForeverIcon>
            </Tooltip>
        </IconButton>)
}

