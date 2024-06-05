import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatOverlineIcon from '@mui/icons-material/FormatOverline';

export default function ToolsSetFontOverline() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const {   setTool } = AnchorContext


    const handlerFontBoldClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontBold')
    }

    return (
        <IconButton
            color='secondary'
            
            sx={{ position: 'relative',width:30,height:'100%'  }}
        >
            <Tooltip title="设置字体颜色" TransitionComponent={Zoom} arrow>
                <FormatOverlineIcon > </FormatOverlineIcon>
            </Tooltip>
        </IconButton>)
}

